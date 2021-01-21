import React from "react";
import { Link } from "gatsby";

interface ReadMoreProps {
  to: string;
  title: string;
}

export function ReadMore({ to, title }: ReadMoreProps): JSX.Element {
  return (
    <div className="mt-5 text-sm">
      <Link
        to={to}
        className="font-medium text-indigo-600 hover:text-indigo-500"
      >
        {title} <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  );
}

interface MoreLinkProps {
  to: string;
  title: string;
}

export function MoreLink({ to, title }: MoreLinkProps): JSX.Element {
  return (
    <li className="text-base truncate">
      <Link to={to} className="font-medium text-gray-900 hover:text-gray-700">
        {title}
      </Link>
    </li>
  );
}

interface MoreProps {
  title: string;
  children: React.ReactNode;
  readMoreLink: string;
  readMoreTitle: string;
}

export function More({
  title,
  readMoreLink,
  readMoreTitle,
  children,
}: MoreProps): JSX.Element {
  return (
    <>
      <div>
        <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
          {title}
        </h3>
        <ul className="mt-4 space-y-4">{children}</ul>
      </div>
      <ReadMore title={readMoreTitle} to={readMoreLink} />
    </>
  );
}