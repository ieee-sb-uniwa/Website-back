import { describe, it, expect } from "bun:test";

const sample = [
  {
    id: 0,
    name: "Game Development",
    name_short: "GameDev",
    wallpaper: "http://localhost/files/assets/photos/Gamedev.JPG",
    images: ["http://localhost/files/projects/notifier.jpg"],
    logo: "http://localhost/files/assets/logos/scientific_groups/gamedev.svg",
    info: {
      gr: {
        description:
          "Entry level game development team. Το Game Development είναι ένας κλάδος που έχει ανάγκη από ανθρώπους με διαφορετικά προσόντα και δεξιότητες. Ελάτε στην ομάδας μας για να δημιουργήσετε τους κόσμους και τους χαρακτήρες των παιχνιδιών ή τα γραφικά και τα εφέ. Επίσης μπορείτε να δημιουργήσετε τον κώδικα που καθοδηγεί τα παιχνίδια ή να συνεισφέρετε στην ιστορία και τα σενάρια.",
      },
      en: {
        description:
          "Entry level game development team. Game Development is an industry that needs people with different qualifications and skills. Join our team to create game worlds and characters or graphics and effects. You can also create the code that drives the games or contribute to the story and scenarios.",
      },
    },
  },
];

describe("check scientific groups endpoint", () => {
  it("should fetch scientific groups from localhost greek", async () => {
    const response = await fetch("http://localhost/api/scientific_groups");
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);

    const expected = {
      _id: expect.any(String),
      ...sample[0],
      description: sample[0].info.gr.description,
    };
    delete (expected as any).info;

    expect(data[0]).toEqual(expect.objectContaining(expected));
  });

  it("should fetch scientific groups from localhost english", async () => {
    const response = await fetch(
      "http://localhost/api/scientific_groups?lang=en"
    );
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);

    const expected = {
      _id: expect.any(String),
      ...sample[0],
      description: sample[0].info.en.description,
    };
    delete (expected as any).info;

    expect(data[0]).toEqual(expect.objectContaining(expected));
  });
});
