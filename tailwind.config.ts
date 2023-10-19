import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: 'rgb(0, 33, 87)',
        overlay: {
          20: 'rgba(33, 33, 33, 0.2)'
        }
      },
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif']
      }
    }
  }
}
