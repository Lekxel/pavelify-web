import { OperatingHoursCheckbox } from "App/component/organisms/settings/OperatingHours/OperatingHoursCheckbox/OperatingHoursCheckbox";

const SettingsOperatingHours = () => (
  <div className="right-side Operating-right-side">
    <h2 className="special-h2">Operating Hours</h2>
    <form action="">
      <OperatingHoursCheckbox day="Sunday" />
      <OperatingHoursCheckbox day="Monday" />
      <OperatingHoursCheckbox day="Tuesday" />
      <OperatingHoursCheckbox day="Wednesday" />
      <OperatingHoursCheckbox day="Thursday" />
      <OperatingHoursCheckbox day="Friday" />
      <OperatingHoursCheckbox day="Saturday" />
    </form>
  </div>
);

export default SettingsOperatingHours;
