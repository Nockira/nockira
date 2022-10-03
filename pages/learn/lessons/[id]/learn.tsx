import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "react-feather";
import Button from "../../../../components/Button";
import LearnLayout from "../../../../components/LearnLayout";
import ReactAudioPlayer from "react-audio-player";

export default function Learn() {
  return (
    <LearnLayout>
      <div>
        <div className="flex items-center mt-2 justify-center">
          <a
            href=""
            className="p-[7px] hover:bg-gray-100 cursor-pointer rounded-l-[4px] border-2 border-r-0 border-gray-500 "
          >
            <ArrowLeft strokeWidth={2} size={18} className="text-gray-500" />
          </a>
          <div className="flex px-3 hover:bg-gray-100 cursor-pointer py-[6px] items-center border-2 border-gray-500 ">
            <Menu size={18} className="text-gray-500 mr-3" />
            <span className="font-bold capitalize text-[13.5px] text-gray-600">
              Ibigize isomo
            </span>
          </div>
          <a
            href=""
            className=" border-2 hover:bg-gray-100  rounded-r-[4px] p-[7px] border-l-0 h-full border-gray-500 "
          >
            <ArrowRight size={18} className="text-gray-500" />
          </a>
        </div>
        <div className="flex justify-between border-b pb-5 border-gray-200 items-center my-7">
          <h4>Variables and Types</h4>
          <Button>Next</Button>
        </div>
        <ReactAudioPlayer
          className="w-full mb-7"
          src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
          autoPlay={false}
          controls
        />
        <div>
          <div className="markdown">
            <div>
              <h2 className="css-1sl3ts5">1. Variables and Types</h2>
              <p>
                Well done and welcome back! It&apos;s clear that Python is a
                great calculator. If you want to do more complex calculations
                though, you will want to &quot;save&quot; values while
                you&apos;re coding along.
              </p>
            </div>
            <div>
              <h2 className="css-1sl3ts5">2. Variable</h2>
              <p>
                You can do this by defining a variable, with a specific,
                case-sensitive name. Once you create (or declare) such a
                variable, you can later call up its value by typing the variable
                name. Suppose you measure your height and weight, in metric
                units: you are 1-point-79 meters tall, and weigh 68-point-7
                kilograms. You can assign these values to two variables, named
                height and weight, with an equals sign: If you now type the name
                of the variable, height, Python looks for the variable name,
                retrieves its value, and prints it out.
              </p>
            </div>
            <div>
              <h2 className="css-1sl3ts5">3. Calculate BMI</h2>
              <p>
                Let&apos;s now calculate the Body Mass Index, or BMI, which is
                calculated as follows, with weight in kilograms and height in
                meters. You can do this with the actual values, but you can just
                as well use the variables height and weight, like in here. Every
                time you type the variable&apos;s name, you are asking Python to
                change it with the actual value of the variable. weight
                corresponds to 68-point-7, and height to 1-point-79. Finally,
                this version has Python store the result in a new variable, bmi.
                bmi now contains the same value as the one you calculated
                earlier. In Python, variables are used all the time. They help
                to make your code reproducible.
              </p>
            </div>
            <div>
              <h2 className="css-1sl3ts5">4. Reproducibility</h2>
              <p>
                Suppose the code to create the height, weight and bmi variable
                are in a script, like this. If you now want to recalculate the
                bmi for another weight,
              </p>
            </div>
            <div>
              <h2 className="css-1sl3ts5">5. Reproducibility</h2>
              <p>
                you can simply change the declaration of the weight variable,
                and rerun the script. The bmi changes accordingly, because the
                value of the variable weight has changed as well. So far,
                we&apos;ve only worked with numerical values, such as height and
                weight.
              </p>
            </div>
            <div>
              <h2 className="css-1sl3ts5">6. Python Types</h2>
              <p>
                In Python, these numbers all have a specific type. You can check
                out the type of a value with the type function. To see the type
                of our bmi value, simply write type and then bmi inside
                parentheses. You can see that it&apos;s a float, which is
                python&apos;s way of representing a real number, so a number
                which can have both an integer part and a fractional part.
                Python also has a type for integers: int, like this example. To
                do data science, you&apos;ll need more than ints and floats,
                though.
              </p>
            </div>
            <div>
              <h2 className="css-1sl3ts5">7. Python Types (2)</h2>
              <p>
                Python features tons of other data types. The most common ones
                are strings and booleans. A string is Python&apos;s way to
                represent text. You can use both double and single quotes to
                build a string, as you can see from these examples. If you print
                the type of the last variable here, you see that it&apos;s str,
                short for string. The Boolean is a type that can either be True
                or False. You can think of it as &apos;Yes&apos; and
                &apos;No&apos; in everyday language. Booleans will be very
                useful in the future, to perform filtering operations on your
                data for example. There&apos;s something special about Python
                data types.
              </p>
            </div>
            <div>
              <h2 className="css-1sl3ts5">8. Python Types (3)</h2>
              <p>
                Have a look at this line of code, that sums two integers, and
                then this line of code, that sums two strings. For the integers,
                the values were summed, while for the strings, the strings were
                pasted together. The plus operator behaved differently for
                different data types. This is a general principle: how the code
                behaves depends on the types you&apos;re working with. In the
                exercises that follow, you&apos;ll create your first variables
                and experiment with some of Python&apos;s data types. I&apos;ll
                see you in the next video to explain all about lists.
              </p>
            </div>
            <div>
              <h2 className="css-1sl3ts5">9. Let&apos;s practice!</h2>
              <p>
                Let&apos;s get you coding and I can&apos;t wait to see you in
                the next chapter where you&apos;ll build even more awesome
                python charts.
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-6 items-center justify-between">
          <div className="flex items-center border rounded-[4px] cursor-pointer hover:bg-slate-100 border-gray-200 w-full py-2 px-2">
            <a href="" className="pr-4 pl-2">
              <ChevronLeft size={18} className="text-gray-500" />
            </a>
            <div>
              <h4 className="text-[14px] text-gray-700 mb-2">Subira Inyuma.</h4>
              <p className="font-semibold text-sm text-gray-500">
                1. Variables and Types
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end text-right border rounded-[4px] cursor-pointer hover:bg-slate-100 border-gray-200 w-full py-2 px-2">
            <div>
              <h4 className="text-[14px] mb-2">komeza Imbere.</h4>
              <p className="font-semibold text-sm text-gray-500">
                1. Variables and Types
              </p>
            </div>
            <a href="" className="pr-2 pl-4">
              <ChevronRight size={18} className="text-gray-500" />
            </a>
          </div>
        </div>
      </div>
    </LearnLayout>
  );
}
