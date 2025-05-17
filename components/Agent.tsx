import { cn } from "@/lib/utils";
import Image from "next/image";

const Agent = ({ userName }: AgentProps) => {
  const isSpeaking = true;

  enum CallStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    FINISHED = "FINISHED",
    CONNECTING = "CONNECTING",
  }

  const callStatus = CallStatus.FINISHED;

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {/* using animate-ping property of tailwind for speaking animation*/}
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user avatar"
              width={540}
              height={540}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="btn-call relative">
            <span
              className={cn(
                "absolute animate-ping opacity-75 rounded-full",
                (callStatus !== "CONNECTING") & "hidden"
              )}
            />
            <span>
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">End </button>
        )}
      </div>
    </>
  );
};

export default Agent;
