"use client"
import {useForm, useFieldArray} from "react-hook-form";
import {DevTool} from "@hookform/devtools";


type FormValues = {
    username: string,
    email: string,
    channel: string
    social: {
        twitter: string,
        facebook: string
    }
    phone: string[];
    //dynamic filed / it is arr of obj
    phoneNum: {
        number: string;
    }[],
    age: number,
    date: Date

}

export default function Form() {
    const form = useForm<FormValues>({
        defaultValues: {
            username: "",
            email: "",
            channel: "",
            social: {
                twitter: "",
                facebook: ""
            },
            phone: ["", ""],
            phoneNum: [{number: ""}],
            age: 0,
            date: new Date()
        },

    })
    // tracking form states
    const {
        register, control, handleSubmit, formState,
        watch, getValues, setValue
    } = form
    //watch === event.target.value in watch in every change page reloads but ,so we can use get values to get them without any rerender
    const watchUserName = watch("username")

    //we do not need it when we use spread operator
    const {name, ref, onChange, onBlur} = register("username")
    //errors in validation message / touched (does user click on field) / dirty (does value change and also added or not)
    const {errors, dirtyFields, touchedFields, isDirty} = formState
    const {fields, append, remove} = useFieldArray({
        name: 'phoneNum',
        control
    })

    const onSubmit = (data: FormValues) => {
        return console.log(data)
    }
    const handleGetValues = () => {
        console.log(getValues())
        //just for one key
        console.log(getValues("username"))
        //more than one we have to use arr of strings
        console.log(getValues(["username", "channel"]))

    }

    const handleSetValue = () => {
        setValue("username", "", {shouldDirty: true, shouldTouch: true, shouldValidate: true})
    }

    return (
        <>
            <h2>username:{watchUserName}</h2>
            <form className="flex flex-col gap-3 bg-slate-100 p-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* userName */}
                <div className="flex flex-col gap-3">
                    <label htmlFor="username">user name</label>
                    <input type="text"
                           id="username"
                        // second arg of register obj is validation part
                           {...register("username", {
                               required: {
                                   value: true,
                                   message: "Username is required"
                               }
                           })}
                        // =^
                        // name={name}
                        // ref={ref}
                        // onChange={onChange}
                        // onBlur={onBlur}
                        // placeholder="Username"
                    />
                </div>
                <p>{errors.username?.message}</p>
                {/* email */}
                <div className="flex flex-col gap-3">
                    <label htmlFor="email">email</label>
                    <input type="email" id="email"  {...register("email", {
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "Please enter a valid email address"
                        },
                        //custom validation, each key is rule
                        validate: {
                            notAdmin: (fieldValue) => {
                                return (
                                    fieldValue !== "admin@example.com" ||
                                    "enter a valid email address"
                                )
                            },
                            notBlackListed: (fieldValue) => {
                                return !fieldValue.endsWith('baddomain.com') || 'this domain is not supported'
                            }
                        }
                    })} placeholder="Email"/>
                </div>
                <p>{errors.email?.message}</p>
                {/* channel */}
                <div className="flex flex-col gap-3">
                    <label htmlFor="channel">channel</label>
                    <input type="text" id="channel"  {...register("channel")} />
                </div>
                <p>{errors.channel?.message}</p>
                {/* social media */}
                <div className="flex flex-col gap-3">
                    <label htmlFor="twitter">twitter</label>
                    <input type="text" id="twitter"  {...register("social.twitter")} />
                </div>
                {/* social media */}
                <div className="flex flex-col gap-3">
                    <label htmlFor="facebook">facebook</label>
                    <input type="text" id="facebook"  {...register("social.facebook")} />
                </div>
                {/* phone number */}
                <div className="flex flex-col gap-3">
                    <label htmlFor="primary-phone">primary-phone</label>
                    <input type="text" id="primary-phone"  {...register("phone.0")} />
                </div>
                {/* phone number2 */}
                <div className="flex flex-col gap-3">
                    <label htmlFor="secondary-phone">secondary-phone</label>
                    <input type="text" id="secondary-phone"  {...register("phone.1")} />
                </div>
                {/* dynamic phone number / abel of adding and removing  / we can add many fields as much as we want without determined limit for it/ we use useFieldArray */}
                <div>
                    <label>list of of phone list</label>
                    <div>
                        {fields.map((field, index) => {
                            return (
                                <div className="form-control mt-5" key={field.id}>
                                    <input
                                        type='text' {...register(`phoneNum.${index}.number` as const)}/>
                                    {index > 0 && (
                                        <button className="bg-purple-200 rounded px-4 py-2 ml-2" type="button"
                                                onClick={() => remove(index)}>remove phone
                                            number</button>
                                    )}
                                </div>

                            )
                        })}
                        <button className="bg-green-200 rounded px-4 py-2" type="button"
                                onClick={() => append({number: ""})}>add phone number
                        </button>

                    </div>
                </div>

                {/* age */}
                <div className="flex flex-col gap-3">
                    <label htmlFor="age">age</label>
                    <input type="number" id="age"  {...register("age", {
                        valueAsNumber: true
                    })} />
                </div>
                <p>{errors.age?.message}</p>

                {/* date */}
                <div className="flex flex-col gap-3">
                    <label htmlFor="date">date of birth</label>
                    <input type="date" id="date"  {...register("date", {
                        valueAsDate: true
                    })} />
                </div>
                <p>{errors.date?.message}</p>
                {/* submit */}
                <div>
                    <button className="bg-green-500 text-white rounded px-4 py-2" type="submit">Submit</button>
                </div>

                <div>
                    <button className="bg-blue-500 text-white rounded px-4 py-2" type="button"
                            onClick={handleGetValues}>get
                        values
                    </button>
                </div>
                <div>
                    <button className="bg-blue-500 text-white rounded px-4 py-2" type="button"
                            onClick={handleSetValue}>set
                        value
                    </button>
                </div>
            </form>
            <DevTool control={control}/>
        </>
    )
}