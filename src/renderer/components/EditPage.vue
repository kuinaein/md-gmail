<template lang="pug">
.container
  textarea(v-model="md" rows="15" style="width:90vw")
  p プレビュー：
  div(id="formatted" v-html="formatted")
  button.btn.btn-primary(type="button" @click="saveAsDraft") Gmail下書きに保存
</template>

<style scoped>
#formatted >>> table {
  border-collapse: collapse;
}
#formatted >>> th, #formatted >>> td {
  border: solid 1px black;
}
</style>

<script>
import moment from 'moment'
import URLSafeBase64 from 'urlsafe-base64'
import { google } from 'googleapis'
import marked from 'marked'
import { escape as escapeHtml } from 'html-escaper'

const BOUNDARY = 'MY_BOUNDARY_GX9900'

export default {
  data () {
    return {
      md: ''
    }
  },
  computed: {
    formatted () {
      return marked(this.md)
    }
  },
  methods: {
    saveAsDraft () {
      const gmail = google.gmail({
        version: 'v1', auth: this.$mdGmail.googleAuth })
      const body = this.formatted.replace(/<table>/g,
        '<table border="1" style="border-collapse:collapse">') + `
<br/><br/>
<small>Markdownソース:
<textarea readonly rows="1" cols="1">${escapeHtml(this.md)}</textarea></small>
`
      const subject = '【日報】' + moment().format('YYMMDD')
      const email = `Subject: =?UTF-8?B?${URLSafeBase64.encode(Buffer.from(subject))}?=
Content-Type: multipart/alternative; boundary="${BOUNDARY}"

--${BOUNDARY}
Content-Type: text/html; charset="UTF-8"
Content-Transfer-Encoding: base64

${Buffer.from(body).toString('base64')}
--${BOUNDARY}--`
      gmail.users.drafts.create({
        userId: 'me',
        resource: { message: { raw: URLSafeBase64.encode(Buffer.from(email)) } }
      }).then(res => {
        alert('保存しました')
      }).catch(err => {
        console.log(err)
        alert('エラー！: ' + err)
      })
    }
  }
}
</script>
