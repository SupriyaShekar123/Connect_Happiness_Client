import React, { useState, useEffect } from "react";

export default function EventForm() {
  return (
    <div>
      <form>
        <label>Title</label>
        <input type='text' />
        <label>Detail</label>
        <input type='text' />
        <label>ImageUrl</label>
        <input type='text' />
        <label>Date</label>
        <input type='date' />
        <label>location</label>
        <input type='address' />
        <button>Add this Event</button>
      </form>
    </div>
  );
}
