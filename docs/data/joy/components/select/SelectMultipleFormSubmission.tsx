import * as React from 'react';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Stack from '@mui/joy/Stack';

export default function SelectMultipleFormSubmission() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const selectedPets = JSON.parse(formJson.pets);
        alert(JSON.stringify(selectedPets));
      }}
    >
      <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Select
          placeholder="Select a pet"
          name="pets"
          required
          multiple
          defaultValue={['dog', 'cat']}
          sx={{ minWidth: 200 }}
        >
          <Option value="dog">Dog</Option>
          <Option value="cat">Cat</Option>
          <Option value="fish">Fish</Option>
          <Option value="bird">Bird</Option>
        </Select>
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
}
