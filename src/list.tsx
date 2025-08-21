

import { useEffect, useState } from "react";

type Item = {
    id: string;
    slug: string;
    title: string;
    desc: string;
    leader: string;
    cal: string;
    start: Date;
    end: Date;
    youtube: string | null;
    ama: boolean;
    amaId: string;
    amaAvatar?: string;
    amaName?: string;
};
const usePlaceholders = false;


export default function List() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        document.title = "Upcoming Events - Hack Club";
        if (!usePlaceholders) {
            const API = "https://events.hackclub.com/api/events/upcoming";
            const url = `https://corsproxy.io/?${encodeURIComponent(API)}`;
            fetch(url)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to load events");
                    return res.json();
                })
                .then((data) => {
                    const mapped: Item[] = (Array.isArray(data) ? data : []).map((d: any) => ({
                        id: String(d.id ?? d.slug ?? Math.random().toString(36).slice(2)),
                        slug: String(d.slug ?? ""),
                        title: String(d.title ?? ""),
                        desc: String(d.desc ?? d.description ?? ""),
                        leader: String(d.leader ?? ""),
                        cal: String(d.cal ?? ""),
                        start: d.start ? new Date(d.start) : new Date(),
                        end: d.end ? new Date(d.end) : new Date(),
                        youtube: d.youtube ?? null,
                        ama: Boolean(d.ama ?? false),
                        amaId: String(d.amaId ?? ""),
                        amaAvatar: d.amaAvatar ?? undefined,
                        amaName: d.amaName ?? undefined,
                    }));
                    setItems(mapped);
                })
                .catch((err) => {
                    console.error(err);
                    setItems([]);
                });
        } else {
            setItems([
                {
                    id: 'test',
                    slug: "test",
                    title: "test",
                    desc: "test",
                    leader: "test",
                    cal: "test",
                    start: new Date,
                    end: new Date,
                    youtube: "test",
                    ama: true,
                    amaId: "test",
                },
                {
                    id: 'test2',
                    slug: "test2",
                    title: "test2",
                    desc: "test2",
                    leader: "test2",
                    cal: "test2",
                    start: new Date,
                    end: new Date,
                    youtube: "test2",
                    ama: false,
                    amaId: "test2",
                }
            ])
        }
    }, []);
    return (
        <div className="container">
            <h1 className="title">Upcoming Events</h1>
            <p className="subtitle">Join in and build something great.</p>
            <select name="ama" id="ama" onChange={() => { setItems([...items]) }}>
                <option value="">All Events</option>
                <option value="true">Only ask me anything</option>
                <option value="false">No ask me anything</option>
            </select>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {items.map((itemthing) => renderItem(itemthing))}
            </ul>
        </div>
    );
}
function openLink(url: string) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
}

function renderItem(item: Item) {
    if (!filterfucntion(item)) {
        return
    }
    return (
        <li key={item.id} style={{ marginBottom: "var(--spacing-3)" }}>
            <article className="card">
                <div style={{ padding: "var(--spacing-3)" }}>
                    <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
                        <h2 className="headline">{item.title}</h2>
                        <h4 className="subtitle">{item.end.getDate()}-{item.start.getMonth()}-{item.start.getFullYear()}</h4>
                        <button
                            className="float-right"
                            onClick={() => { openLink(`https://events.hackclub.com/${item.slug}`); }}>
                            Details
                        </button>
                        {item.youtube && (
                            <button onClick={() => { openLink(item.youtube || '') }}>
                                Watch on YouTube
                            </button>
                        )}
                        {item.cal && (
                            <button
                                className="outline"
                                onClick={() => {
                                    openLink(item.cal);
                                }} >
                                Add to Calendar
                            </button>
                        )}
                    </div>
                </div>
            </article>
        </li>
    )
}
function filterfucntion(item: Item) {
    let ama = document.getElementById("ama") as HTMLSelectElement;
    if (ama.value == "true") {
        console.log("ama is true")
        return item.ama
    } else if (ama.value == "false") {
        console.log("ama is false")
        return !item.ama
    } else if (ama.value === "") {
        console.log("ama is empty, showing all events")
        return true;
    }
}