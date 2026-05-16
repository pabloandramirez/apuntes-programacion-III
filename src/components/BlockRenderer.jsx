import CalloutBlock from "./blocks/CalloutBlock";
import DefinitionBlock from "./blocks/DefinitionBlock";
import ExerciseBlock from "./blocks/ExerciseBlock";
import ListBlock from "./blocks/ListBlock";
import StepsBlock from "./blocks/StepsBlock";
import SubtitleBlock from "./blocks/SubtitleBlock";
import TableBlock from "./blocks/TableBlock";
import TextBlock from "./blocks/TextBlock";

export default function BlockRenderer({ item, index }) {
    switch (item.type) {
    case "definition":
      return <DefinitionBlock item={item} />;

    case "callout":
      return <CalloutBlock item={item} />;

    case "table":
      return <TableBlock item={item} />;

    case "text":
      return <TextBlock item={item} />;

    case "subtitle":
      return <SubtitleBlock item={item} />;

    case "list":
      return <ListBlock item={item} />;

    case "steps":
      return <StepsBlock item={item} />;

    case "exercise":
      return <ExerciseBlock item={item} index={index} />;

    default:
      return null;
    }
}