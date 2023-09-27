import { FC } from "react";
import SignUp from "@/app/components/SignUp";

const page: FC = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full  flex xsm:mx-auto flex-col  justify-between gap-20">
        <SignUp />
      </div>
    </div>
  );
};

export default page;
