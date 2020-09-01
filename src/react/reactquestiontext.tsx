import * as React from "react";
import { SurveyQuestionUncontrolledElement } from "./reactquestionelement";
import { QuestionTextModel } from "../question_text";
import { ReactQuestionFactory } from "./reactquestionfactory";

export class SurveyQuestionText extends SurveyQuestionUncontrolledElement<
  QuestionTextModel
> {
  constructor(props: any) {
    super(props);
    this.state={
      value:""
    }
  }
  render(): JSX.Element {
    if (!this.question) return null;
    var cssClasses = this.question.cssClasses;
    var onBlur = (event)=>{
      this.setState({value:event.target.value})
      !this.question.isInputTextUpdate
      ? this.updateValueOnEvent(event)
      : null;
    }
    var onInput = (event)=>{
      this.setState({value:event.target.value})
      this.question.isInputTextUpdate
      ? this.updateValueOnEvent(event)
      : null;
    }
    var placeHolder =
      this.question.inputType === "range" || this.question.isReadOnly
        ? ""
        : this.question.placeHolder;
    return (
      <>
      <input
        id={this.question.inputId}
        disabled={this.isDisplayMode}
        value={this.state.value}
        className={cssClasses.root}
        type={this.question.inputType}
        ref={input => (this.control = input)}
        maxLength={this.question.getMaxLength()}
        min={this.question.min}
        max={this.question.max}
        step={this.question.step}
        size={this.question.size}
        placeholder={placeHolder}
        onBlur={onBlur}
        onInput={onInput}
        aria-required={this.question.isRequired}
        aria-label={this.question.locTitle.renderedHtml} 
        aria-invalid={this.question.errors.length > 0}
        aria-describedby={this.question.errors.length > 0 ? this.question.id + '_errors' : null}
      />
    { this.question.inputType === "range"?
    <div style={{display:"flex",justifyContent:"space-between"}}>
      <div>
      {this.question.min}
      </div>
      <div>
      {this.state.value}
      </div>
      <div>
      {this.question.max}
      </div>
      </div>
    :null}
      </>
    );
  }
}

ReactQuestionFactory.Instance.registerQuestion("text", props => {
  return React.createElement(SurveyQuestionText, props);
});
