import Link from "next/link";

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
  judge: string;
  contest_id: string;
  index: string;
  // test_cases: TestCase[];
}

const Problems = async () => {
  const base_url = process.env.BASE_URL;
  const problems: Problem[] = await (
    await fetch(`${base_url}/api/problems`, {
      cache: "no-store",
    })
  ).json();

  return (
    <div className="overflow-x-auto">
      <table className="table table-pin-rows table-pin-col">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Judge</th>
            <th>Problem Title</th>
          </tr>
        </thead>
        <tbody>
          {/* body */}
          {problems.map((problem, index) => (
            <tr key={problem.id}>
              <td>{index + 1}</td>
              <td>{problem.judge}</td>
              <td>
                <Link
                  href={"problems/" + problem.contest_id + "/" + problem.index}
                >
                  {problem.title}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Problems;
