import { Fragment } from "react";

export default function Button({
  children,
  className,
  outlined,
  Icon,
  color,
  bg,
  onClick,
  disabled,
  small,
  loading,
  non,
  normal,
  danger,
  light,
  styles,
  to,
  rounded,
  noRightIcon,
}: any) {
  const style = ` ${className}  ${
    disabled ? "pointer-events-none opacity-60 text-gray-600" : undefined
  }  ${
    outlined
      ? "border bg-transparent"
      : normal
      ? "border border-gray-200 text-gray-500 "
      : danger
      ? "bg-red-500 text-white"
      : light
      ? "bg-white text-gray-800"
      : non
      ? "bg-transparent text-gray-800"
      : `bg-primary text-white`
  }  font-bold  text-[14px] ${rounded ? "rounded-3xl " : "rounded-[4px]"} ${
    loading ? "loading-btn opacity-70" : undefined
  } flex ${
    small && "text-[13px] py-[6px] px-[18px]"
  }  py-[8px] group text-[14px] px-[16px] truncate hover:bg-opacity-80 items-center font-bold justify-center capitalize  cursor-pointer relative`;
  return (
    <a style={styles} onClick={onClick} className={style}>
      <span className={`${loading ? "invisible" : ""} flex items-center`}>
        {children}
      </span>
      {!Icon && (
        <Fragment>
          {!noRightIcon && (
            <div className="relative h-full ml-7 flex mt-[2px] items-center justify-end w-0 bg-re-500">
              <svg
                className=" hidden top0 group-hover:block right-[4.5px] transition-all  absolute stroke-current ml-3"
                width={10}
                height={10}
                strokeWidth={2}
                viewBox="0 0 10 10"
                aria-hidden="true"
              >
                <path d="M0 5h7" />
              </svg>
              <svg
                className=" group-hover:right-0 transition-all right-[5px] absolute stroke-current"
                viewBox="0 0 24 24"
                width={15}
                height={15}
                stroke="currentColor"
                strokeWidth={3}
                fill="none"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
              {/* <svg
          className="text-white group-hover:right-0 transition-all right-[5px] absolute stroke-current"
          width={10}
          height={10}
          strokeWidth={2}
          viewBox="0 0 10 10"
          aria-hidden="true"
        >
          <g>
            <path d="M1 1l4 4-4 4" />
          </g>
        </svg> */}
            </div>
          )}
        </Fragment>
      )}
      {Icon && <Icon strokeWidth={4} className="ml-3" size={12} />}
    </a>
  );
}
