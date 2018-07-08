<template lang="pug">
webview(ref="webview" :src="url" @will-navigate="onWillNavigate")
</template>

<style scoped>
webview {
  display: inline-flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<script>
export default {
  data () {
    return { url: 'about:blank' }
  },
  mounted () {
    if (process.env.NODE_ENV === 'development') {
      window.webview = this.$refs.webview
    }
    this.url = this.$mdGmail.googleAuth.generateAuthUrl({scope: 'https://www.googleapis.com/auth/gmail.compose'})
  },
  methods: {
    onWillNavigate (ev) {
      const url = '' + ev.url
      if (url.startsWith(this.$mdGmail.GOOGLE_REDIRECT_URI)) {
        this.$refs.webview.loadURL('about:blank')
        const parser = new URL(url)
        const code = parser.searchParams.get('code')
        this.$mdGmail.googleAuth.getToken(code).then(res => {
          this.$mdGmail.googleAuth.credentials = res.tokens
          this.$router.push({name: 'edit'})
        })
      }
    }
  }
}
</script>
