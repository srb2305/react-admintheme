import { Helmet } from 'react-helmet-async';

import { FeedbackView } from 'src/sections/feedback/view';

// ----------------------------------------------------------------------

export default function Feedback() {
  return (
    <>
      <Helmet>
        <title> Feedback | Srb Tracking </title>
      </Helmet>

      <FeedbackView />
    </>
  );
}
