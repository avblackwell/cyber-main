// logic for dropdowns
document.addEventListener('alpine:init', () => {
  Alpine.data('dropdown', () => ({
    open: false,
    toggle() {
      if (this.open) {
        return this.close()
      }

      this.$refs.button.focus()

      this.open = true
    },
    close(focusAfter) {
      if (!this.open) return

      this.open = false

      focusAfter && focusAfter.focus()
    },
  }))
})

// logic for tabs
document.addEventListener('alpine:init', () => {
  Alpine.data('tab', () => ({
    selectedId: null,
    init() {
      // Set the first available tab on the page on page load.
      this.$nextTick(() => this.select(this.$id('tab', 1)))
    },
    select(id) {
      this.selectedId = id
    },
    isSelected(id) {
      return this.selectedId === id
    },
    whichChild(el, parent) {
      return Array.from(parent.children).indexOf(el) + 1
    },
  }))
})

// logic for tooltips
document.addEventListener('alpine:init', () => {
  // Magic: $tooltip
  Alpine.magic('tooltip', el => message => {
      let instance = tippy(el, { content: message, trigger: 'manual' })

      instance.show()

      setTimeout(() => {
          instance.hide()

          setTimeout(() => instance.destroy(), 150)
      }, 2000)
  })

  // Directive: x-tooltip
  Alpine.directive('tooltip', (el, { expression }) => {
      tippy(el, { content: expression })
  })
})

// testing api fetch 
document.addEventListener('alpine:init', async () => {
  const response = await fetch('https://potterhead-api.vercel.app/api/spells')
  const data = await response.json()
  magic = data
  isLoading = false
  Alpine.data('magic', () => ({
    magic: [],
    isLoading: true,
  }))
})
