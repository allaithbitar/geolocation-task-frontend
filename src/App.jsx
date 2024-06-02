import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  selectAddressInputValue,
  selectEmailInputValue,
  selectSendResultViaMailValue,
  setAddress,
  setEmail,
  setSendResultViaMail,
} from "./redux/slices/inputsSlice";
import { useDispatch } from "react-redux";
import { useSearchGeoLocationMutation } from "./redux/rtk-query";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableBody,
} from "./components/ui/table";
import { Checkbox } from "./components/ui/checkbox";

function App() {
  const [searchGeolocation, { isLoading }] = useSearchGeoLocationMutation();
  const emailInputValue = selectEmailInputValue();
  const addressInputValue = selectAddressInputValue();
  const sendResultViaMailValue = selectSendResultViaMailValue();

  const dispatch = useDispatch();

  const [result, setResult] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    let loadingToastId;
    try {
      loadingToastId = toast.loading("Searching...");
      const { data } = await searchGeolocation({
        address: addressInputValue,
        ...(sendResultViaMailValue && {
          sendResultViaMail: sendResultViaMailValue,
          email: emailInputValue,
        }),
      }).unwrap();
      if (data) {
        toast.success("Success !");
      } else {
        toast.error("No Results Found !");
      }
      setResult(data);
    } catch (error) {
      toast.error(error?.data?.message ?? "Something went wrong !");
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <div className="grid place-items-center w-screen">
      <form onSubmit={handleSearch}>
        <div className="flex flex-col gap-3 mt-[30vh]">
          <h1 className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent text-6xl mb-10 font-bold">
            Geolocation Searcher
          </h1>
          <Input
            disabled={isLoading}
            value={addressInputValue}
            onChange={(e) => dispatch(setAddress(e.target.value))}
            placeholder="Address"
          />
          <Input
            disabled={isLoading}
            value={emailInputValue}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            type="email"
            placeholder="Email Address"
          />
          <div className="flex items-center gap-3 text-gray-300">
            <Checkbox
              disabled={isLoading || !emailInputValue}
              checked={sendResultViaMailValue}
              onCheckedChange={(v) => dispatch(setSendResultViaMail(v))}
            />
            <p>Send result via mail</p>
          </div>
          <Button
            type="submit"
            onClick={handleSearch}
            disabled={
              !addressInputValue ||
              isLoading ||
              (!emailInputValue && sendResultViaMailValue)
            }
          >
            Search
          </Button>
          {result && (
            <Table className="text-center">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Location</TableHead>
                  <TableHead className="text-center">Longitude</TableHead>
                  <TableHead className="text-center">Latitude</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{result.query}</TableCell>
                  <TableCell>{result.long}</TableCell>
                  <TableCell>{result.lat}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
