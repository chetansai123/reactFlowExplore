import { StartCallNode } from "./StartCallNode.jsx";
import { AnswerCallNode } from "./AnswerCallNode.jsx";
import { AddContactsListNode } from "./AddContactsListNode.jsx";
import { ComplexNode } from "./complexNode/ComplexNode.js";
import { OptionNode } from "./complexNode/OptionNode.js";
import { AudioFileNode } from "./AudioFileNode.jsx";
import CustomEdge from "./CustomEdge.js";
import { AgentNode } from "./AgentNode.jsx";
import { AutoAttendantNode } from "./AutoAttendantNode.jsx";
import { GroupNode } from "./GroupNode.jsx";

export const nodeTypes = {
  startCall: StartCallNode,
  answerCall: AnswerCallNode,
  addContactsList: AddContactsListNode,
  complexNode: ComplexNode,
  optionNode: OptionNode,
  audioNode: AudioFileNode,
  agentNode: AgentNode,
  autoAttendant: AutoAttendantNode,
  groupNode: GroupNode,
};

export const edgeTypes = {
  customEdge: CustomEdge,
};
