/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center text-sm text-gray-500">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.href ? (
            <Link to={item.href} className="hover:text-[#ed501f] transition-colors hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-black font-medium">{item.label}</span>
          )}

          {index < items.length - 1 && (
            <span className="mx-2">/</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;