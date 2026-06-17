import { useEffect } from "react";
import { useAppDispatch } from "../../Store/Hook";
import { Queries } from "../../Api";
import { setSettings } from "../../Store/Slices/SettingsSlice";

const SettingsInitializer = () => {
  const dispatch = useAppDispatch();
  const { data: settingsData } = Queries.useGetAllSettings();

  useEffect(() => {
    if (settingsData?.data) {
      dispatch(setSettings(settingsData.data));
    }
  }, [settingsData, dispatch]);

  return null;
};

export default SettingsInitializer;
