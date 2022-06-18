import { httpBookEvent, httpGetEvent } from "api/calendar";
import { Button } from "App/component/Atoms/Auth/Button/Button";
import useGetSubdomain from "hooks/useGetSubdomain";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { publicRoutes } from "routes/routes";
import { showError } from "utilities/alerts";
import { timeFunction } from "utilities/calendar";
import { validateEmail, validateName, validatePhone } from "utilities/misc";
import { CalenderBookingArea } from "../../../../component/templates/Calender/CalenderBookingArea/CalenderBookingArea";

import { PeronMettingArea } from "../../../../component/templates/Calender/PeronMettingArea/PeronMettingArea";
import { SelecTimeArea } from "../../../../component/templates/Calender/SelecTimeArea/SelecTimeArea";
import { ConfirmationPopUpCalender } from "../ConfirmationPopUpCalender/ConfirmationPopUpCalender";
import style from "./Calender.module.css";
export const Calender = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [_, companySlug, eventSlug] = location.pathname.split("/");
  const [step, setStep] = useState(0);
  const [event, setEvent] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [company, setCompany] = useState({});
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [showTime, setShowTime] = useState(true);
  const [showCalendar, setShowCalendar] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [times, setTimes] = useState([]);
  const { domain } = useGetSubdomain();

  useEffect(() => {
    event?.availableTimeRange?.to &&
      timeFunction(
        event?.availableTimeRange?.from,
        event?.availableTimeRange?.to,
        event,
        setTimes,
        setTime,
        timezone,
        event?.duration
      );
  }, [event?.availableTimeRange?.to, event?.availableTimeRange?.from, timezone, event?.duration]);

  useEffect(() => {
    if (time && date) {
      let d = DateTime.fromJSDate(date).setZone(timezone);
      const [times, daylight] = time.split(" ");
      let [h, m] = times.split(":");
      daylight === "PM" && (h = parseInt(h) + 12);
      d = d.set({ hour: parseInt(h), minute: parseInt(m) });
      setFormattedDate(d);
    }
  }, [date, time]);

  const getEvent = async () => {
    httpGetEvent(companySlug, eventSlug)
      .then((data) => {
        setLoading(false);
        if (data.success) {
          setEvent(data.event);
          setCompany(data.company);
        }
      })
      .catch((err) => {
        setLoading(false);
        navigate(publicRoutes.home);
      });
  };

  useEffect(() => {
    getEvent();
  }, []);

  const calendarClicked = () => {
    const { innerWidth } = window;
    if (innerWidth < 600) {
      setShowCalendar(false);
      setShowTime(true);
    }
  };

  const onResize = () => {
    const { innerWidth } = window;
    setShowTime(innerWidth < 600 ? false : true);
    setShowCalendar(true);
  };

  useEffect(() => {
    onResize();

    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize, { passive: true });
  }, []);

  const nextStep = () => {
    if (!date) {
      return showError("Please select a date");
    }
    if (!time) {
      return showError("Please select time");
    }
    setStep((p) => ++p);
  };

  const prevStep = () => {
    setStep((p) => --p);
  };

  const onSubmit = async () => {
    if (!validateName(name)) {
      return showError("Please enter your valid name");
    }
    if (!validateEmail(email)) {
      return showError("Please enter your valid email");
    }
    if (!validatePhone(phone)) {
      return showError("Please enter a valid phone number");
    }

    const data = {
      name,
      email,
      phone,
      time: formattedDate,
      timezone
    };

    setLoading(true);

    httpBookEvent(data, event._id)
      .then((data) => {
        setLoading(false);
        if (data.success) {
          setStep(3);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      {step === 0 && (
        <div style={{ position: "relative" }}>
          <div className={`${style.calender} w-1200`}>
            <PeronMettingArea
              data={{
                timezone,
                setTimezone,
                company,
                event
              }}
            />

            <CalenderBookingArea data={{ setDate, date, event, calendarClicked }} />
            <SelecTimeArea
              data={{
                company,
                event,
                time,
                setTime,
                timezone,
                times
              }}
            />
            <div
              className="text-center position-absolute bottom-0"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingRight: "100px",
                height: "20px"
              }}
            >
              <Button onClick={nextStep} block={false} text={"Continue"} />
            </div>
          </div>
          <p
            style={{
              position: "absolute",
              bottom: "-80px",
              left: 0,
              right: 0,
              width: "100vw",
              textAlign: "center"
            }}
          >
            Powered by{" "}
            <a target="_blank" href="https://pavelify.com">
              Pavelify
            </a>
          </p>
        </div>
      )}
      {step === 1 && (
        <ConfirmationPopUpCalender
          data={{
            company,
            event,
            timezone,
            name,
            setName,
            email,
            setEmail,
            phone,
            setPhone,
            onSubmit,
            prevStep,
            formattedDate,
            isLoading
          }}
        />
      )}

      {step === 3 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100vw",
            height: "100vh"
          }}
        >
          <h3 className="text-center">The meeting has been scheduled successfully!</h3>
          <h4 className="mt-5 text-secondary text-center">
            You will receive an email shortly containing information about the meeting.
          </h4>
          <div className="text-center mt-5">
            <Button
              block={false}
              onClick={() => window.location.replace(`${window.location.protocol}//${domain}`)}
              text={"Back to Home"}
            />
          </div>
        </div>
      )}
    </>
  );
};
