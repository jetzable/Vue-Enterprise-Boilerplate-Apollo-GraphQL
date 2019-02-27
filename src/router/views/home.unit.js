import { createLocalVue, mount } from '@vue/test-utils'
import { getQueriesForElement, prettyDOM } from 'dom-testing-library'
import Home from './home'
import { GET_REPOS_FROM_OWNER } from '@/src/gql/queries'

function render(component, options) {
  const localVue = createLocalVue()
  const wrapper = mount(component, {
    localVue,
    attachToDocument: true,
    ...options,
  })

  return {
    wrapper,
    ...getQueriesForElement(wrapper.element),
    debug: () => console.log(prettyDOM(wrapper.element)),
  }
}

describe('Home', () => {
  it('is a valid view', () => {
    expect(Home).toBeAViewComponent()
  })
  it('renders input for owner', () => {
    const { getByPlaceholderText } = render(Home, {})
    const inputOwner = getByPlaceholderText('Repository Owner')
    expect(inputOwner).toBeTruthy()
  })
  it('execute query repos from owner', () => {
    const query = jest.fn(async () => {
      await GET_REPOS_FROM_OWNER
    })
    const { wrapper } = render(Home, {
      mocks: {
        $apollo: {
          query,
        },
      },
    })
    const btn = wrapper.findAll('button').at(1)
    const buttonText = btn.text()
    expect(buttonText).toContain('Search Owner Repositories')

    wrapper.vm.getReposFromOwner()
    expect(query).toHaveBeenCalledTimes(1)
  })
  it('it shows repos from owner', () => {
    const resp = {
      data: {
        repositoryOwner: {
          repositories: {
            nodes: [
              {
                createdAt: '2018-09-14T15:57:50Z',
                description:
                  'This is my first aproach to the Blockchain Technology.',
                name: 'MyFirstBlockchain',
                primaryLanguage: {
                  name: 'JavaScript',
                },
                url: 'https://github.com/jetzable/MyFirstBlockchain',
              },
            ],
          },
        },
      },
    }

    const query = jest.fn(() => {
      return new Promise((resolve) => {
        return resp
      })
    })

    const { wrapper, debug } = render(Home, {
      mocks: {
        $apollo: {
          query,
        },
      },
    })
    const btn = wrapper.findAll('button').at(1)
    const buttonText = btn.text()
    expect(buttonText).toContain('Search Owner Repositories')

    wrapper.vm.getReposFromOwner()
    expect(query).toHaveBeenCalledTimes(1)
    debug()
  })
})
