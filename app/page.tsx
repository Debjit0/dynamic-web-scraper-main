"use client";

import { useState } from "react";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { button as buttonStyles } from "@heroui/theme";
import { SearchIcon, GithubIcon } from "@/components/icons";
import { title, subtitle } from "@/components/primitives";

import { Listbox, ListboxSection, ListboxItem } from "@heroui/listbox";
import Search from "@/components/search";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";


import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";

import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";

export default function Home() {
  const [isWebsitesModalOpen, setWebsitesModalOpen] = useState(false);
  const [isUpcomingModalOpen, setUpcomingModalOpen] = useState(false);

  const websites = [
    'https://2717recovery.com/products/recovery-cream',
    'https://www.trustpilot.com',
    'https://www.shopclues.com/combo-of-2-my-chetan-9-w-round-2-pin-led-bulb-white-153526540.html',
    'https://www.shopclues.com/chamria-hing-wati-digestive-mouth-freshner-200-gm-can-pack-of-2-153514795.html'
  ];

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">


      {/* Hero Section */}
      {/* <div className="inline-block max-w-xl text-center justify-center">
        <span className="text-xs block mb-6 text-gray-600">Powered by AWS, Google AI Studio, Playwright & Next.js</span>
        <span className={title()}>Scrape reviews from&nbsp;</span>
        <span className={title({ color: "violet" })}>product websites&nbsp;</span>
        <br />
        <div className={subtitle({ class: "mt-4" })}>
          Enter the product URL & we will handle the rest 
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href="https://github.com/fru2/Product_Review_Scraper"
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div> */}
      <HeroHighlight containerClassName="bg-black">
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
       Just Paste a product website Url and
        {" "}
        <Highlight className="text-black dark:text-white">
          Let us do the Magic.
        </Highlight>
      </motion.h1>
    </HeroHighlight>


      {/* Input and Button */}
      <Search />

      {/* Tested Websites Modal */}
      <Modal isOpen={isWebsitesModalOpen} size="4xl" onOpenChange={() => setWebsitesModalOpen(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Tested websites</ModalHeader>
              <ModalBody>
                <ul className="flex flex-col gap-2">
                  {websites.map((website) => (
                    <li key={website} className="w-full">
                      <Popover placement="right">
                        <PopoverTrigger>
                          <Button variant="bordered" className="w-full" onPress={() => handleCopy(website)}>
                            {website}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2">
                            <div className="text-tiny">Copied to clipboard</div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </li>
                  ))}
                </ul>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Upcoming Modal */}
      <Modal isOpen={isUpcomingModalOpen} size="md" onOpenChange={() => setUpcomingModalOpen(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Upcoming</ModalHeader>
              <ModalBody>
                <p>Real-Time Data Streaming</p>
                <p>Enhanced Reliability with an Improved LLM</p>
                <p>Faster Processing with Parallel AWS Task Execution</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </section>
  );
}




export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        With insomnia, nothing&apos;s real. Everything is far away. Everything
        is a{" "}
        <Highlight className="text-black dark:text-white">
          copy, of a copy, of a copy.
        </Highlight>
      </motion.h1>
    </HeroHighlight>
  );
}

