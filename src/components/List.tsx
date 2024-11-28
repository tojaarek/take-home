import { FC, useState } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";
import { ChevronDownIcon } from "./icons";
import { useStore } from "../store";

type CardProps = {
  id: ListItem["id"];
  title: ListItem["title"];
  description?: ListItem["description"];
};

export const Card: FC<CardProps> = ({ id, title, description }) => {
  const { deleteCard } = useStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (description) {
    return (
      <div
        className={`w-full border border-black px-2 py-2 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-64" : "max-h-10"
        }`}
      >
        <div className="flex justify-between mb-0.5 w-full">
          <h1 className="font-medium">{title}</h1>
          <div className="flex">
            <ExpandButton onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </ExpandButton>
            <DeleteButton onClick={() => deleteCard(id)} />
          </div>
        </div>
        <p className="text-sm">{description}</p>
      </div>
    );
  }
  
  return (
    <div className="w-full border border-black px-2 py-2 max-h-10">
      <div className="flex justify-between mb-0.5 w-full">
        <h1 className="font-medium">{title}</h1>
      </div>
    </div>
  );
};
