import "./style.scss";

const QuestionView = (props) => {
  return (
    <div className="question">
      {props.index && <div>{props.index}</div>}
    </div>
  );
};

export default QuestionView;