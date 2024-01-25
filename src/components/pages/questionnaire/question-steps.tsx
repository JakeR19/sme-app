import { type QuestionsFetchReturnType } from "~/lib/types/questions";

export default function QuestionSteps({
  groupedQuestions,
  pageNames,
  index,
}: {
  groupedQuestions: Record<string, Record<string, QuestionsFetchReturnType[]>>;
  pageNames: string[];
  index: number;
}) {
  return (
    <div>
      {groupedQuestions[pageNames[index]!] && (
        <div>
          <h2>{pageNames[index]}</h2>
          {Object.entries(groupedQuestions[pageNames[index]!]!).map(
            ([type, questions]) => (
              <div key={type}>
                <h3>{type}</h3>
                <ul>
                  {questions.map((question) => (
                    <li key={question.id}>{question.title}</li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}
