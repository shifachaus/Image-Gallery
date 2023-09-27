import { FC } from "react";
import SignIn from "@/app/components/SignIn";

const page: FC = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full  flex xsm:mx-auto flex-col  justify-between gap-20">
        <SignIn />
      </div>
    </div>
  );
};

export default page;
