"use client";
import React, { useEffect, useState } from "react";
import { IconPlus, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { motionTransition } from "@/constants/motionTransition";

const Tags = ({
  setFormTags,
  formTags,
}: {
  setFormTags: (tags: string[]) => void;
  formTags: string[];
}) => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTags, setNewTags] = useState<string[]>(tags);

  // Toggle manual input or add new spec
  const handleManualSpecs = () => {
    if (tagInput.trim().length > 0) {
      addTag(tagInput.trim());
    }
  };

  // Add a spec to the list and select it
  const addTag = (spec: string) => {
    if (!tags.includes(spec)) {
      setTags((prev) => [...prev, spec]);
    }
    if (!newTags.includes(spec)) {
      setNewTags((prev) => [...prev, spec]);
    }
    setTagInput("");
  };

  useEffect(() => {
    setTags(newTags);
    setFormTags(tags);
  }, [newTags, tags, setFormTags]);

  const handleTagsChange = (spec: string) => {
    if (newTags.includes(spec)) {
      setNewTags((prev) => prev.filter((s) => s !== spec));
    } else {
      setNewTags((prev) => [...prev, spec]);
    }
  };

  // Handle Enter key in input
  const handleInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (tagInput.trim().length > 0) {
        addTag(tagInput.trim());
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <div className={`w-full p-2 border border-[var(--border)] rounded-[var(--radius-m)] bg-[var(--background-2)] flex items-center`}>
        <div
          style={{ position: "relative" }}
          className="relative flex flex-col gap-2"
        >
          <label className="font-p-2" htmlFor="">Tags</label>
          <div className="flex gap-2 flex-wrap w-full">
            <div className="items-center grid grid-cols-[1fr_auto] w-[12rem] pl-2 pr-1 rounded-4xl border border-[var(--border)]">
              <input
                className={`font-medium h-[1.8rem] font-p-2`}
                type="text"
                value={tagInput}
                placeholder="Tag name..."
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleInputKey}
              />
              <span
                onClick={handleManualSpecs}
                className="cursor-pointer bg-[var(--primary)] h-[1.35rem] w-[1.35rem] flex items-center justify-center rounded-full"
              >
                <IconPlus className="h-4 w-4" color="var(--white)" />
              </span>
            </div>

            {formTags.map((tag, index) => (
              <motion.span
                layout
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={motionTransition()}
                className={`tags px-2 h-[1.8rem]  border border-[var(--border)] rounded-4xl flex items-center font-p-2 ${
                  tags.includes(tag) ? "selected-spec" : ""
                }`}
              >
                {tag}
                <span onClick={() => handleTagsChange(tag)}>
                  <IconX className="h-3 w-3 ml-2  cursor-pointer" />{" "}
                </span>
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Tags;
