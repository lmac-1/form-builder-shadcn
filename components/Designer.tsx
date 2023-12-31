"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import DesignerSidebar from "./DesignerSidebar";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import useDesigner from "./hooks/useDesigner";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./FormElements";
import { idGenerator } from "@/lib/idGenerator";
import { Button } from "./ui/button";
import { BiSolidTrash } from "react-icons/bi";

export default function Designer() {
  const { elements, addElement } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  console.log("ELEMENTS", elements);

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;

      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        const newElement =
          FormElements[type as ElementsType].construct(idGenerator());
        addElement(0, newElement);
      }

      console.log("DRAG END", event);
    },
  });

  return (
    <div className="flex h-full w-full">
      <div className="w-full p-4">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "m-auto flex h-full max-w-[920px] flex-1 flex-grow flex-col items-center justify-start overflow-y-auto rounded-xl bg-background",
            droppable.isOver && "ring-2 ring-primary/20",
          )}
        >
          {!droppable.isOver && elements.length == 0 && (
            <p className="flex flex-grow items-center text-3xl font-bold text-muted-foreground">
              Drop here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="w-full p-4">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex w-full flex-col gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const { removeElement } = useDesigner();

  const [mouseIsOver, setMouseIsOver] = useState(false);

  // We create two droppable zones: top and bottom half of the area
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      id: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      id: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });
  if (draggable.isDragging) return null;

  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative flex h-[120px] flex-col rounded-md text-foreground ring-1 ring-inset ring-accent hover:cursor-pointer"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute h-1/2 w-full rounded-t-md "
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 h-1/2 w-full rounded-b-md"
      ></div>
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              variant="outline"
              className="flex h-full justify-center rounded-md rounded-l-none border bg-red-500"
              onClick={() => removeElement(element.id)}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-sm text-muted-foreground">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 h-[7px] w-full rounded-md rounded-b-none bg-primary"></div>
      )}
      <div
        className={cn(
          "pointer-events-none flex h-[120px] w-full items-center rounded-md bg-accent/40 px-4 py-2 opacity-100",
          mouseIsOver && "opacity-30",
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 h-[7px] w-full rounded-md rounded-t-none bg-primary"></div>
      )}
    </div>
  );
}
