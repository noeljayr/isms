"use client";

import ChevronDown from "@/components/svg/ChevronDown";
import Search from "@/components/svg/Search";
import { content } from "@/context/data/content";
import { useState } from "react";
import Image from "next/image";
import doc from "@/public/doc.png";
import video from "@/public/video.png";
import { formatFileSize } from "@/utils/formatFileSize";
import { IconDownload, IconPhotoFilled } from "@tabler/icons-react";
import FileDownload from "@/components/svg/FileDownload";
import { useSearchParams } from "next/navigation";
import UploadContent from "@/components/modals/content/UploadContent";

const contentType = [
  {
    label: "All types",
    format: "*",
  },
  {
    label: "PDF Documents",
    format: "PDF",
  },
  {
    label: "Word Documents",
    format: "PDF",
  },
  {
    label: "Presentaions",
    format: "PPTX",
  },
  {
    label: "Videos",
    format: "MP4",
  },
];

function ELibrary() {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeType, setActiveType] = useState(contentType[0]);

  const openUpload = () => {
    const params = new URLSearchParams(useSearchParams.toString());
    params.set("upload", "true");
    history.pushState(null, "", `?upload=true`);
  };

  

  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] gap-4 pt-4">
        <div className="flex items-center w-full">
          <button onClick={openUpload} className="cta-2 mr-4">
            <span className="rotate-180">
              <FileDownload />
            </span>
            Upload content
          </button>
          <div
            style={{ width: "20rem" }}
            className="search input-group mr-auto"
          >
            <Search />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search..."
            />
          </div>

          <div
            style={{ width: "8rem" }}
            className={`dropdown cta-2 grid grid-cols-[auto_1fr] items-center gap-1 relative ${
              dropdownOpen ? "dropdown-active" : ""
            }`}
          >
            <span
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
              }}
              className="dropdown-title"
            >
              {activeType.label}
            </span>
            <span
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
              }}
              className="dropdown-icon"
            >
              <ChevronDown />
            </span>
            <div
              className={`dropdown-options ${
                dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              {contentType.map((content, index) => (
                <span
                  key={index}
                  onClick={() => {
                    setActiveType(content);
                    setDropdownOpen(!dropdownOpen);
                  }}
                  className={`dropdown-option cta-2 ${
                    activeType === content ? "active" : ""
                  }`}
                >
                  {content.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid w-full h-full gap-4 overflow-y-auto auto-rows-min">
          {content.map((c, index) => (
            <div
              key={index}
              className="grid grid-cols-[auto_1fr_auto] gap-4 items-center"
            >
              <span className="h-10 w-10 flex cursor-pointer items-center justify-center bg-[var(--background)] rounded-[var(--radius-s)]">
                <IconPhotoFilled color="var(--primary)" className="opacity-20" />
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-semibold font-p-2 cursor-pointer hover:underline">
                  {c.title}
                </span>
                <div className="flex gap-4 font-p-3 font-medium items-center">
                  <span className="opacity-80">
                    {formatFileSize(c.fileSize)}
                  </span>
                  <span className="px-2 py-0.5 font-medium cursor-pointer font-p-4 border border-[var(--border-2)] bg-[var(--background)] rounded-4xl">
                    {c.contentType}
                  </span>
                  {c.tags.map((t, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 cursor-pointer font-medium font-p-4 border border-[var(--border-2)] bg-[var(--background)] rounded-4xl capitalize"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {c.allowDownload && (
                <button className="opacity-80 cursor-pointer">
                  <IconDownload color="var(--primary)" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <UploadContent />
    </>
  );
}

export default ELibrary;
