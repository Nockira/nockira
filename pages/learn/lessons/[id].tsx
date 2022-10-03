import React from "react";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  File,
  Globe,
  Mic,
  Smartphone,
  Users,
} from "react-feather";
import Button from "../../../components/Button";
import LearnLayout from "../../../components/LearnLayout";

export default function Lesson() {
  const lesson: any = {
    name: "Isomo ryuzuye ryo kwitegura ikizamini cy'uruhushya rw'agateganyo",
    desc: "Gusobanukirwa amategeko y'umuhanda hagamijwe gutsinda ikizamini",
    description: "hello",
    counts: {
      participants: 20,
      chapters: 30,
      lectures: 10,
    },
    archivements: [
      "Iri somo rikubiyemo ibice byose bigize amategeko y'umuhanda mu Rwanda",
      "Buri gice (Chapter) gifite umwitozo.",
      "Harimo igice kivuga ku mategeko rusange ajyanye no gutwara mu muhanda",
      "Harimo igice kigaruka ku magambo akunze gukoreshwa ndetse n'amategeko y'ibanze",
      "Harimo ibyapa n'ibimenyetso byose bikoreshwa mu Rwanda",
      "Uburyo bwiza bwo kwiga ndetse ubyishimiye.",
    ],
    published: "mars 19,2022",
    requirements: [
      "kaba ufite ubushake",
      "kuba uzi gusoma no kwandika",
      "kuba ufite ubwenge bwogutekereza",
    ],
    objectives: [],
  };
  return (
    <LearnLayout>
      <div className="max-w-7xl px-3 mx-auto  md:my-5 my-2">
        <div className=" ">
          <div className="col-span-2">
            <div className="mb-6 border-l-2 border-l-primary px-3">
              <h4 className="text-base md:text-xl sm:text-[18px]">
                {lesson.name}
              </h4>
              <p className="font-semibold text-sm my-2 max-w-xl leading-7 text-gray-500">
                {lesson.desc}
              </p>
            </div>

            <div className="sm:grid sm:grid-cols-2 sm:mt-8 sm:gap-4 flex flex-wrap sm:justify-start justify-between items-center my-6">
              {[
                {
                  icon: BookOpen,
                  title: `amasomo ${lesson.counts?.lectures}`,
                },
                {
                  icon: File,
                  title: `ibyiciro ${lesson.counts?.chapters}`,
                },
                {
                  icon: Users,
                  title: `abitabiriye ${lesson.counts?.participants}`,
                },
                {
                  icon: Calendar,
                  title: lesson.published,
                },
              ].map((i, index) => {
                return (
                  <div
                    key={index}
                    className={`sm:last-of-type:hidden flex sm:mr-4 sm:mb-4 items-center`}
                  >
                    <i.icon size={15} className="mr-2" />
                    <span className="font-semibold capitalize text-sm">
                      {i.title}
                    </span>
                  </div>
                );
              })}
            </div>

            <div>
              <div className="mt-7">
                <div className="my-3">
                  <h4 className="text-[14.5px] border-l-2 border-l-primary px-3  capitalize">
                    Ibyo uzavana mu isomo
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-0">
                  {lesson.archivements.map((i, index) => {
                    return (
                      <div key={index} className="my-1 flex items-start">
                        <span className="mr-3 mt-3">
                          <CheckCircle size={16} className="text-primary" />
                        </span>
                        <p className="font-semibold leading-8 capitalize text-[14px] text-gray-600">
                          {i}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <div className="mt-7">
                <div className="my-3">
                  <h4 className="text-[14.5px] border-l-2 border-l-primary px-3  capitalize">
                    Ibyo usabwa bwambere
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-0">
                  {lesson.requirements.map((i, index) => {
                    return (
                      <div key={index} className="my-1 flex items-start">
                        <span className="mr-3 mt-3">
                          <CheckCircle size={16} className="text-primary" />
                        </span>
                        <p className="font-semibold leading-8 capitalize text-[14px] text-gray-600">
                          {i}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="card mt-7">
              <div className="px-5">
                <div>
                  {[
                    {
                      icon: Globe,
                      title: "Ikinyarwanda",
                    },
                    {
                      icon: File,
                      title: "Imyitozo ya buri somo kugirango ubyunve",
                    },
                    {
                      icon: Mic,
                      title: "kubatangira n' ababizi",
                    },
                    {
                      icon: Smartphone,
                      title: "wakwigara kuri telephone na mudasobwa",
                    },
                    {
                      icon: Clock,
                      title: "Igihe cyose wakwiga",
                    },
                  ].map((i, index) => {
                    return (
                      <div key={index} className="flex my-6 items-center">
                        <i.icon size={18} className="text-primary" />
                        <span className="font-semibold text-sm ml-3 text-gray-600">
                          {i.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="text-center mb-4 flex-col items-center">
                  <Button>Tangira Isomo</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LearnLayout>
  );
}
