import React, { useEffect } from "react";
import styled from "styled-components";
import scrollreveal from "scrollreveal";
import { H4 } from "../typography/h4";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

const Ecommerce = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        .row__one,
        .row__two
    `,
      {
        opacity: 0,
        interval: 100,
      },
    );
  }, []);

  const sortOptions = [
    { name: "Most Popular", href: "#", current: true },
    { name: "Best Rating", href: "#", current: false },
    { name: "Newest", href: "#", current: false },
    { name: "Price: Low to High", href: "#", current: false },
    { name: "Price: High to Low", href: "#", current: false },
  ];
  const subCategories = [
    { name: "Totes", href: "#" },
    { name: "Backpacks", href: "#" },
    { name: "Travel Bags", href: "#" },
    { name: "Hip Bags", href: "#" },
    { name: "Laptop Sleeves", href: "#" },
  ];
  const filters = [
    {
      id: "color",
      name: "Color",
      options: [
        { value: "white", label: "White", checked: false },
        { value: "beige", label: "Beige", checked: false },
        { value: "blue", label: "Blue", checked: true },
        { value: "brown", label: "Brown", checked: false },
        { value: "green", label: "Green", checked: false },
        { value: "purple", label: "Purple", checked: false },
      ],
    },
    {
      id: "category",
      name: "Category",
      options: [
        { value: "new-arrivals", label: "New Arrivals", checked: false },
        { value: "sale", label: "Sale", checked: false },
        { value: "travel", label: "Travel", checked: true },
        { value: "organization", label: "Organization", checked: false },
        { value: "accessories", label: "Accessories", checked: false },
      ],
    },
    {
      id: "size",
      name: "Size",
      options: [
        { value: "2l", label: "2L", checked: false },
        { value: "6l", label: "6L", checked: false },
        { value: "12l", label: "12L", checked: false },
        { value: "18l", label: "18L", checked: false },
        { value: "20l", label: "20L", checked: false },
        { value: "40l", label: "40L", checked: true },
      ],
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className=" min-h-screen">
      <Section>
        <div>
          <ul className="flex">
            <li className="flex-1 mr-2">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-300 hover:text-gray-700">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute leftt-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm",
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              {/* <H4>Ecommerce</H4>
                <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                  <div class="flex items-center">
                    <div class="relative inline-block text-left">
                      <div>
                        <button type="button" class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="true">
                          Sort
                          <svg class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      <div class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                        <div class="py-1" role="none">
                          <a href="#" class="font-medium text-gray-900 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Most Popular</a>
                          <a href="#" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Best Rating</a>
                          <a href="#" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Newest</a>
                          <a href="#" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Price: Low to High</a>
                          <a href="#" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-4">Price: High to Low</a>
                        </div>
                      </div>
                    </div>
                    <button type="button" class="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                      <span class="sr-only">View grid</span>
                      <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button type="button" class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
                      <span class="sr-only">Filters</span>
                      <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div> */}
              {/* <a className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white" href="#">Active Item</a> */}
            </li>
            <li className="flex-1 mr-2">
              {/* <a className="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4" href="#">Nav Item</a> */}
              <h5>Search Bar</h5>
            </li>
            <li className="text-center flex-1">
              {/* <a className="block py-2 px-4 text-gray-400 cursor-not-allowed" href="#">Disabled Item</a> */}
              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </li>
          </ul>
        </div>
        <div className="row mt-5">
          <div className="col-xl-3">
            <div
              className="card"
              style={{
                backgroundColor: "#211f21",
                borderRadius: "16px",
                color: "#846424",
              }}
            >
              {/* <div className="card-body pt-4">
                <div className="w-100">
                  <div className="d-flex flex-row align-items-center justify-content-between mb-4">
                    <H4>Create Proposal</H4>
                  </div>
                  <div
                    className="card"
                    style={{
                      backgroundColor: "#121112",
                      borderRadius: "16px",
                      color: "#846424",
                    }}
                  >
                    <div className="card-body">
                      Tip: You must be staking CGT to submit a proposal.
                      Select an action below and describe your proposal for
                      the community.
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="col-xl-9">
            <div
              className="card"
              style={{
                backgroundColor: "#211f21",
                borderRadius: "16px",
                color: "#846424",
              }}
            >
              <div className="card-body pt-4">
                <div className="w-100">
                  <div className="d-flex flex-row align-items-center justify-content-between mb-4">
                    <H4>MarketPlace</H4>
                  </div>
                  <div
                    className="card"
                    style={{
                      backgroundColor: "#121112",
                      borderRadius: "16px",
                      color: "#846424",
                    }}
                  >
                    <div className="card-body">CHC Project MarketPlace</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
    // <div className=" min-h-screen">
    //   <Section>
    //     {/* Mobile filter dialog */}
    //     <div className="row mt-5">
    //       <div className="col-xl-3">
    //         {/* <Transition.Root show={mobileFiltersOpen} as={Fragment}>
    //           <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
    //             <Transition.Child
    //               as={Fragment}
    //               enter="transition-opacity ease-linear duration-300"
    //               enterFrom="opacity-0"
    //               enterTo="opacity-100"
    //               leave="transition-opacity ease-linear duration-300"
    //               leaveFrom="opacity-100"
    //               leaveTo="opacity-0"
    //             >
    //               <div className="fixed inset-0 bg-black bg-opacity-25" />
    //             </Transition.Child>

    //             <div className="fixed inset-0 z-40 flex">
    //               <Transition.Child
    //                 as={Fragment}
    //                 enter="transition ease-in-out duration-300 transform"
    //                 enterFrom="translate-x-full"
    //                 enterTo="translate-x-0"
    //                 leave="transition ease-in-out duration-300 transform"
    //                 leaveFrom="translate-x-0"
    //                 leaveTo="translate-x-full"
    //               >
    //                 <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
    //                   <div className="flex items-center justify-between px-4">
    //                     <h2 className="text-lg font-medium text-gray-900">Filters</h2>
    //                     <button
    //                       type="button"
    //                       className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
    //                       onClick={() => setMobileFiltersOpen(false)}
    //                     >
    //                       <span className="sr-only">Close menu</span>
    //                       <XMarkIcon className="h-6 w-6" aria-hidden="true" />
    //                     </button>
    //                   </div>

    //                   <form className="mt-4 border-t border-gray-200">
    //                     <h3 className="sr-only">Categories</h3>
    //                     <ul role="list" className="px-2 py-3 font-medium text-gray-900">
    //                       {subCategories.map((category) => (
    //                         <li key={category.name}>
    //                           <a href={category.href} className="block px-2 py-3">
    //                             {category.name}
    //                           </a>
    //                         </li>
    //                       ))}
    //                     </ul>

    //                     {filters.map((section) => (
    //                       <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
    //                         {({ open }) => (
    //                           <>
    //                             <h3 className="-mx-2 -my-3 flow-root">
    //                               <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
    //                                 <span className="font-medium text-gray-900">{section.name}</span>
    //                                 <span className="ml-6 flex items-center">
    //                                   {open ? (
    //                                     <MinusIcon className="h-5 w-5" aria-hidden="true" />
    //                                   ) : (
    //                                     <PlusIcon className="h-5 w-5" aria-hidden="true" />
    //                                   )}
    //                                 </span>
    //                               </Disclosure.Button>
    //                             </h3>
    //                             <Disclosure.Panel className="pt-6">
    //                               <div className="space-y-6">
    //                                 {section.options.map((option, optionIdx) => (
    //                                   <div key={option.value} className="flex items-center">
    //                                     <input
    //                                       id={`filter-mobile-${section.id}-${optionIdx}`}
    //                                       name={`${section.id}[]`}
    //                                       defaultValue={option.value}
    //                                       type="checkbox"
    //                                       defaultChecked={option.checked}
    //                                       className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
    //                                     />
    //                                     <label
    //                                       htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
    //                                       className="ml-3 min-w-0 flex-1 text-gray-500"
    //                                     >
    //                                       {option.label}
    //                                     </label>
    //                                   </div>
    //                                 ))}
    //                               </div>
    //                             </Disclosure.Panel>
    //                           </>
    //                         )}
    //                       </Disclosure>
    //                     ))}
    //                   </form>
    //                 </Dialog.Panel>
    //               </Transition.Child>
    //             </div>
    //           </Dialog>
    //         </Transition.Root> */}
    //       </div>
    //       <div className="col-xl-9">
    //       <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    //         <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
    //           <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

    //           {/* <div className="flex items-center"> */}
    //             <Menu as="div" className="relative inline-block text-left">
    //               <div>
    //                 <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
    //                   Sort
    //                   <ChevronDownIcon
    //                     className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
    //                     aria-hidden="true"
    //                   />
    //                 </Menu.Button>
    //               </div>

    //               <Transition
    //                 as={Fragment}
    //                 enter="transition ease-out duration-100"
    //                 enterFrom="transform opacity-0 scale-95"
    //                 enterTo="transform opacity-100 scale-100"
    //                 leave="transition ease-in duration-75"
    //                 leaveFrom="transform opacity-100 scale-100"
    //                 leaveTo="transform opacity-0 scale-95"
    //               >
    //                 <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
    //                   <div className="py-1">
    //                     {sortOptions.map((option) => (
    //                       <Menu.Item key={option.name}>
    //                         {({ active }) => (
    //                           <a
    //                             href={option.href}
    //                             className={classNames(
    //                               option.current ? 'font-medium text-gray-900' : 'text-gray-500',
    //                               active ? 'bg-gray-100' : '',
    //                               'block px-4 py-2 text-sm'
    //                             )}
    //                           >
    //                             {option.name}
    //                           </a>
    //                         )}
    //                       </Menu.Item>
    //                     ))}
    //                   </div>
    //                 </Menu.Items>
    //               </Transition>
    //             </Menu>

    //             {/* <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
    //               <span className="sr-only">View grid</span>
    //               <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
    //             </button> */}
    //             {/* <button
    //               type="button"
    //               className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
    //               onClick={() => setMobileFiltersOpen(true)}
    //             >
    //               <span className="sr-only">Filters</span>
    //               <FunnelIcon className="h-5 w-5" aria-hidden="true" />
    //             </button> */}
    //           {/* </div> */}
    //         </div>

    //         {/* <section aria-labelledby="products-heading" className="pb-24 pt-6">
    //           <h2 id="products-heading" className="sr-only">
    //             Products
    //           </h2>

    //           <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

    //             <form className="hidden lg:block">
    //               <h3 className="sr-only">Categories</h3>
    //               <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
    //                 {subCategories.map((category) => (
    //                   <li key={category.name}>
    //                     <a href={category.href}>{category.name}</a>
    //                   </li>
    //                 ))}
    //               </ul>

    //               {filters.map((section) => (
    //                 <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
    //                   {({ open }) => (
    //                     <>
    //                       <h3 className="-my-3 flow-root">
    //                         <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
    //                           <span className="font-medium text-gray-900">{section.name}</span>
    //                           <span className="ml-6 flex items-center">
    //                             {open ? (
    //                               <MinusIcon className="h-5 w-5" aria-hidden="true" />
    //                             ) : (
    //                               <PlusIcon className="h-5 w-5" aria-hidden="true" />
    //                             )}
    //                           </span>
    //                         </Disclosure.Button>
    //                       </h3>
    //                       <Disclosure.Panel className="pt-6">
    //                         <div className="space-y-4">
    //                           {section.options.map((option, optionIdx) => (
    //                             <div key={option.value} className="flex items-center">
    //                               <input
    //                                 id={`filter-${section.id}-${optionIdx}`}
    //                                 name={`${section.id}[]`}
    //                                 defaultValue={option.value}
    //                                 type="checkbox"
    //                                 defaultChecked={option.checked}
    //                                 className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
    //                               />
    //                               <label
    //                                 htmlFor={`filter-${section.id}-${optionIdx}`}
    //                                 className="ml-3 text-sm text-gray-600"
    //                               >
    //                                 {option.label}
    //                               </label>
    //                             </div>
    //                           ))}
    //                         </div>
    //                       </Disclosure.Panel>
    //                     </>
    //                   )}
    //                 </Disclosure>
    //               ))}
    //             </form>
    //             <div className="lg:col-span-3"><h1>Your content</h1></div>
    //           </div>
    //         </section> */}
    //       </main>
    //       </div>
    //     </div>
    //   </Section>
    // </div>
  );
};

export default Ecommerce;

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  background-color: #121212;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;
