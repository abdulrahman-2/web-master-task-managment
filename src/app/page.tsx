import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  return (
    <div>
      <Button className="bg-primary">Button</Button>
      <h1>Hello World</h1>
      <span>The Title today</span>
      <h1 className="text-center p-3 text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
};

export default Home;
