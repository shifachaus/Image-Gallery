import { FC } from "react";
import SignUp from "@/app/components/SignUp";

const page: FC = () => {
  return (
    <div className="abcolute inset-0">
      <div className="h-full max-w-2xl flex mx-auto flex-col items-center justify-between gap-20">
        {/* <Link href="/">Home</Link> */}

        <SignUp />
      </div>
    </div>
  );
};

export default page;
