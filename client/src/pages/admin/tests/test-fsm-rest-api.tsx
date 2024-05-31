import Layout, { pageBodyWidth } from '@/components/layout/layout'
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ActionNotification from '@/serene-core-client/components/notifications/action'
import { RestApiService } from '@/serene-core-client/services/rest-api/service'
import { loadServerPage } from '@/services/page/load-server-page'
import { TextField } from '@mui/material'

interface Props {
  clientUrl: string
  serverUrl: string
  userProfile: any
}

export default function TestFsmRestApiPage({
                          clientUrl,
                          serverUrl,
                          userProfile
                        }: Props) {

  // State
  const [question, setQuestion] = useState('')
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const [notificationSuccessText, setNotificationSuccessText] = useState('Feedback submitted')
  const [notificationSuccessOpened, setNotificationSuccessOpened] = useState(false)
  const [notificationErrorText, setNotificationErrorText] = useState('Failed to submit feedback')
  const [notificationErrorOpened, setNotificationErrorOpened] = useState(false)

  // Functions
  async function testFsmRestApi() {

    // Disable the test button
    setSubmitDisabled(true)

    // REST API call
    const restApiService: RestApiService =
            new RestApiService(clientUrl,
                               serverUrl)

    restApiService.submit({
      relativeUrl: '/api/tools/fsm-rest-api',
      values: {
        question: question
      },
      setSubmitDisabled: setSubmitDisabled,
      setNotificationSuccessText: setNotificationSuccessText,
      setNotificationSuccessOpened: setNotificationSuccessOpened,
      setNotificationErrorText: setNotificationErrorText,
      setNotificationErrorOpened: setNotificationErrorOpened
    })

    // Enable the test button
    setSubmitDisabled(false)
  }

  // Render
  return (
    <Layout userProfileId={userProfile.id}>
      <div style={{ margin: '0 auto', width: pageBodyWidth, verticalAlign: 'textTop' }}>
        <Typography variant='h4'>Test FSM API</Typography>
        <br />
        <TextField
          label='Question'
          onChange={(e) => setQuestion(e.target.value)}
          value={question} />
        <Button
          onClick={(e) => testFsmRestApi()}>
          Test
        </Button>
      </div>
      <br />

      <ActionNotification
        message={notificationSuccessText}
        autoHideDuration={5000}
        notificationOpened={notificationSuccessOpened}
        setNotificationOpened={setNotificationSuccessOpened} />

      <ActionNotification
        message={notificationErrorText}
        autoHideDuration={5000}
        notificationOpened={notificationErrorOpened}
        setNotificationOpened={setNotificationErrorOpened} />
    </Layout>
  )
}

export async function getServerSideProps(context: any) {

  // Verify
  const results = await
          loadServerPage(
            context,
            true,  // verifyLoggedInUsersOnly
            true)  // verifyAdminUsersOnly

  // Pass exportList to the page via props
  return { props: {
             clientUrl: process.env.CLIENT_URL,
             serverUrl: process.env.SERVER_URL
           }
         }
}
