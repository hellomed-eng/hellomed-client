import clsx from "clsx";
import Link from "next/link";

export const DesktopMenu = ({
  setActive,
  children,
}: {
  setActive: any;
  children: any;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="flex flex-wrap items-center"
    >
      {children}
    </nav>
  );
};

export const DesktopMenuItem = ({
  setActive,
  active,
  item,
  bgColor,
}: {
  setActive: any;
  active: any;
  item: any;
  bgColor: any;
}) => {
  return (
    <div className="divide-y py-3" onMouseEnter={() => setActive(item.name)}>
      <div className="font-semibold lg:text-lg text-nowrap text-center mr-6 lg:mr-10">
        {item.dropdown.length === 0 ? (
          <Link href={item.href}>{item.name}</Link>
        ) : (
          <div>{item.name}</div>
        )}
      </div>
      {active === item.name && item.dropdown.length !== 0 && (
        <div
          className={`absolute top-[167px] left-0 w-full ${bgColor} py-4 px-6`}
        >
          <div className="max-w-7xl mx-auto flex flex-wrap justify-start">
            {item.dropdown.map((subItem: any, i: number) => (
              <Link
                key={i}
                href={subItem.href}
                className="w-3/12 px-4 py-2 text-center text-white hover:font-bold"
              >
                {subItem.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const MobileMenu = ({
  setActive,
  navOpen,
  children,
}: {
  setActive: any;
  navOpen: Boolean;
  children: any;
}) => {
  return (
    <nav
      className={clsx("px-2 pt-2 pb-4 text-lg", {
        block: navOpen,
        hidden: !navOpen,
      })}
    >
      {children}
    </nav>
  );
};

export const MobileMenuItem = ({
  setActive,
  active,
  item,
  navOpen,
  setNavOpen,
}: {
  setActive: any;
  active: any;
  item: any;
  navOpen: Boolean;
  setNavOpen: any;
}) => {
  return (
    <div onClick={() => setActive(active === item.name ? null : item.name)}>
      {item.dropdown.length === 0 ? (
        <Link
          href={item.href}
          className="mt-1 block px-2 py-1 font-semibold rounded"
        >
          {item.name}
        </Link>
      ) : (
        <div className="mt-1 block px-2 py-1 font-semibold rounded">
          {item.name}
        </div>
      )}
      {active === item.name && item.dropdown.length !== 0 && (
        <div
          className="w-full py-2 border-y-2"
          onClick={() => {
            setActive(null);
            setNavOpen(false);
          }}
        >
          {item.dropdown.map((subItem: any, i: number) => (
            <Link
              key={i}
              href={subItem.href}
              className="block text-center py-1"
            >
              {subItem.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
