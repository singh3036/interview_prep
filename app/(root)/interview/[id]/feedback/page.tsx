import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getFeedbackByInterviewId,
  getInterviewsById,
} from "@/lib/actions/general.action";
import { redirect } from "next/navigation";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewsById(id);
  if (!interview) {
    redirect("/");
  }

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id ?? "",
  });
  console.log("feedback", feedback);

  return <div>page</div>;
};

export default page;
