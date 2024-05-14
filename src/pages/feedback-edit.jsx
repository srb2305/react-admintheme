import { Helmet } from 'react-helmet-async';

import { FeedbackEditForm } from 'src/sections/feedback/edit';

// ----------------------------------------------------------------------

export default function FeedbackEdit() {
  return (
    <>
      <Helmet>
        <title> Feedback Edit | Srb Tracking </title>
      </Helmet>

      <FeedbackEditForm />
    </>
  );
}
