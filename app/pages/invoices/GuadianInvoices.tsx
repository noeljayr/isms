"use client";

import Check from "@/components/svg/Check";
import Search from "@/components/svg/Search";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import "@/css/invoices.css";

const invoices = [
  {
    id: "1",
    student: "Patricia Saka",
    amount: 5000,
    date: "27 June 2025",
    term: "3",
  },
  {
    id: "2",
    student: "Joseph Dzimbiri",
    amount: 6000,
    date: "23 June 2025",
    term: "2",
  },
  {
    id: "3",
    student: "Patricia Saka",
    amount: 7000,
    date: "22 June 2025",
    term: "3",
  },
  {
    id: "4",
    student: "Joseph Dzimbiri",
    amount: 8000,
    date: "17 June 2025",
    term: "3",
  },
  {
    id: "5",
    student: "Patricia Saka",
    amount: 90000,
    date: "13 June 2025",
    term: "1",
  },
  {
    id: "6",
    student: "Joseph Dzimbiri",
    amount: 100000,
    date: "1 June 2025",
    term: "2",
  },
  {
    id: "7",
    student: "Patricia Saka",
    amount: 110000,
    date: "25 June 2025",
    term: "3",
  },
  {
    id: "8",
    student: "Joseph Dzimbiri",
    amount: 120000,
    date: "18 May 2024",
    term: "3",
  },
  {
    id: "9",
    student: "Patricia Saka",
    amount: 130000,
    date: "17 May 2024",
    term: "2",
  },
  {
    id: "10",
    student: "Joseph Dzimbiri",
    amount: 140000,
    date: "15 May 2024",
    term: "2",
  },
];

function GuadianInvoices() {
  const [activeStudent, setActiveStudent] = useState("");
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );

  return (
    <div className="grid grid-cols-1  grid-rows-[auto_1fr] mt-4 gap-3">
      <div className="checkboxes font-p-3 page-tabs p-2 bg-[var(--background)] w-fit rounded-[var(--radius-s)] font-p-2 flex items-center gap-3">
        <span
          onClick={() => setActiveStudent("")}
          className={`checkbox-container ${
            activeStudent === "" ? "checked" : ""
          }`}
        >
          <span className="checkbox">
            <Check />
          </span>
          <span className="checkbox-label">All my kids</span>
        </span>
        <span className="opacity-10">|</span>
        <span
          onClick={() => setActiveStudent("1")}
          className={`checkbox-container ${
            activeStudent === "1" || activeStudent === "" ? "checked" : ""
          }`}
        >
          <span className="checkbox">
            <Check />
          </span>
          <span className="checkbox-label">Patricia Saka</span>
        </span>

        <span className="opacity-10">|</span>
        <span
          onClick={() => setActiveStudent("2")}
          className={`checkbox-container ${
            activeStudent === "2" || activeStudent === "" ? "checked" : ""
          }`}
        >
          <span className="checkbox">
            <Check />
          </span>
          <span className="checkbox-label">Joseph Dzimbiri</span>
        </span>
      </div>

      <div className="grid grid-rows-[auto_1fr] h-full  w-full gap-2">
        <div className="flex gap-3 items-center w-full invoices-th ">
          <span className="font-semibold opacity-75 mr-auto">
            Recent invoices
          </span>
          <button onClick={() => {}} className="cta">
            Pay fees
          </button>

          <div style={{ width: "15rem" }} className="search input-group">
            <Search />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="invoices-table grid grid-rows-[auto_1fr]">
          <div className="invoices-thead grid font-p-2 grid-cols-[3rem_1fr_1fr_1fr_4rem] h-8 items-center bg-[var(--background-2)] rounded-[var(--radius-s)] px-3">
            <span className="font-semibold opacity-50">#</span>
            <span className="font-semibold opacity-50">Student</span>
            <span className="font-semibold opacity-50">Amount</span>
            <span className="font-semibold opacity-50">Date</span>
            <span className="font-semibold opacity-50">Term</span>
          </div>
          <div className="grid auto-rows-min font-p-2">
            {invoices
              .filter((invoice) =>
                activeStudent ? invoice.student.includes(activeStudent) : true
              )
              .filter((invoice) =>
                invoice.student.toLowerCase().includes(search.toLowerCase())
              )
              .map((invoice, index) => (
                <div
                  className="grid grid-cols-[3rem_1fr_1fr_1fr_4rem] p-3 pt-2 last:pb-0 border-b-[1px] last:border-b-0 border-b-[var(--border)]"
                  key={invoice.id}
                >
                  <span className="font-medium opacity-85">{index + 1}</span>
                  <span className="font-medium ">{invoice.student}</span>
                  <span className="font-medium opacity-85">
                    K {invoice.amount.toLocaleString()}
                  </span>
                  <span className="font-medium opacity-85">{invoice.date}</span>
                  <span className={`${invoice.term.toLowerCase()}`}>
                    {invoice.term}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuadianInvoices;
