import BaseListItem from './_base-listItem'

describe('@components/_base-button', () => {
  it('renders its content', () => {
    const { element } = mount(BaseListItem, {
      propsData: {
        repositories: [],
      },
    })
    expect(element.classList).toContain('row')
  })
})
