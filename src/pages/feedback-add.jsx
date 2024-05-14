import { Helmet } from 'react-helmet-async';

import { FeedbackAddForm } from 'src/sections/feedback/add';

// ----------------------------------------------------------------------

export default function FeedbackAdd() {
  return (
    <>
      <Helmet>
        <title> FeedbackAdd | Srb Tracking </title>
      </Helmet>

      <FeedbackAddForm />
    </>
  );
}
