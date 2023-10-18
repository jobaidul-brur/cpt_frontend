interface TestCase {
  id: number;
  input_text: string;
  output_text: string;
  problem: number;
}

interface Problem {
  id: number;
  title: string;
  problem_statement: string;
  input_specification: string;
  output_specification: string;
  problem_link: string;
  time_limit: string;
  memory_limit: string;
  // test_cases: TestCase[];
}
interface Props {
  params: {
    contestId: string;
    index: string;
  };
}

const RenderProblem = async ({ params: { contestId, index } }: Props) => {
  const base_url = process.env.BASE_URL;
  const problems: Problem[] = await (
    await fetch(`${base_url}/api/problems`, {
      cache: "no-store",
    })
  ).json();
  const link =
    "https://codeforces.com/problemset/problem/" + contestId + "/" + index;
  var problem = problems[0];
  for (var i = 0; i < problems.length; i++) {
    if (problems[i].problem_link == link) {
      problem = problems[i];
    }
  }

  return (
    <div className={"flex p-10"}>
      <div className={"w-1/4 pr-10 pt-2"}>
        <div className="block">
          <div className="flex center m-1">
            <button className="btn btn-xs btn-outline">Submit</button>
            <button className="btn btn-xs btn-outline ml-2">Favourite</button>
          </div>
        </div>
        <div className="card shadow-xl mt-10">
          <div className="card-body">
            <p>Time limit : {problem.time_limit}</p>
            <p>Mem limit : {problem.memory_limit}</p>
          </div>
        </div>
      </div>
      <div className={"block w-3/4 mr-32"}>
        <div className={"flex content-center"}>
          <h2 className={"text-3xl"}>{problem.title}</h2>
          <a
            href={problem.problem_link}
            className={"text-xl pl-5 text-blue-700"}
          >
            Link
          </a>
        </div>
        <h1 className={"font-bold pl-3 m-2"}>Problem Statements</h1>
        <div
          className="card shadow-xl"
          style={{ backgroundColor: "rgba(210,210,255,.5)" }}
        >
          <div
            className="card-body"
            dangerouslySetInnerHTML={{ __html: problem.problem_statement }}
          />
        </div>
        <h1 className={"font-bold pl-3 m-2"}>Input</h1>
        <div
          className="card shadow-xl"
          style={{ backgroundColor: "rgba(210,210,255,.5)" }}
        >
          <div
            className="card-body"
            dangerouslySetInnerHTML={{ __html: problem.input_specification }}
          />
        </div>
        <h1 className={"font-bold pl-3 m-2"}>Output</h1>
        <div
          className="card shadow-xl"
          style={{ backgroundColor: "rgba(210,210,255,.5)" }}
        >
          <div
            className="card-body"
            dangerouslySetInnerHTML={{ __html: problem.output_specification }}
          />
        </div>
        {/* <h1 className={"font-bold"}>Sample</h1>
                <div className="card w-96 shadow-xl"
                    style={{backgroundColor: "rgba(210,210,255,.5)"}}>
                    <div className="card-body">
                        {test_cases.map((test_case) =>
                            <div key={test_case.id}>
                                <h2>Input</h2>
                                <div dangerouslySetInnerHTML={{__html: test_case.input_text}}/>
                                <h2>Output</h2>
                                <div dangerouslySetInnerHTML={{__html: test_case.output_text}}/>
                            </div>)}
                    </div>
                </div> */}
      </div>
    </div>
  );
};

export default RenderProblem;
