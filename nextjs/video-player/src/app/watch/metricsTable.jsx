"use client";
import TimeBucketSelector from "@/components/TimeBucketSelector";
import useWatchSession from "@/hooks/useWatchSession";
import useSWR from "swr";

const FASTAPI_ENDPOINT = "http://localhost:8000/api/video-events/";

export default function MetricsTable({ videoId }) {
    if (!videoId) {
        return null;
    }
    const [bucket, setBucket] = useState(1);
    const [bucketUnit, setBucketUnit] = useState("weeks");
    const timeBucket = `${bucket} ${bucketUnit}`

    const url = `${FASTAPI_ENDPOINT}${videoId}?bucket=${timeBucket}`;
    const session_id = useWatchSession(videoId);
    const headers = {
        "Content-Type": "application/json",
        "X-Session-ID": session_id,
    };

    const fetcher = (url) =>
        fetch(url, { headers: headers }).then((res) => res.json());

    const { data, error, isLoading } = useSWR(url, fetcher);

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;

    return (
        <div>
            <TimeBucketSelector
                bucket={bucket}
                setBucket={setBucket}
                bucketUnit={bucketUnit}
                setBucketUnit={setBucketUnit}
            />

            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Events
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Max Viewership
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Avg Viewership
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Unique Views
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.map((val, idx) => (
                        <tr className="hover:bg-gray-50" key={idx}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(val.time).toString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {val.total_events}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {(val.max_viewership / 60).toFixed(2)}m
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {(val.avg_viewership / 60).toFixed(2)}m
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {val.unique_views}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
