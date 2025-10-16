import Card from "@/components/card";
import Button from "@/components/button";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col h-32 justify-end space-y-3 my-10">
        <h1 className="font-bold">Open Trivia DB Visualizer</h1>
        <p>The mini visualization tool for Open Trivia DB</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        <Card title="Categories">
          <div className="w-full space-y-3">
            <Button text="Button 1"/>
          </div>
        </Card>
        <div className="text-center col-span-3">
          <Card title="Chart">

          </Card>
        </div>
      </div>
    </div>
  );
}
