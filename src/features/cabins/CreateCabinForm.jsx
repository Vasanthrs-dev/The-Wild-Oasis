import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormInputRow from '../../ui/FormInputRow';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditingSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditingSession ? editValues : {},
  });
  const { errors } = formState;

  const isWorking = isCreating || isEditing;

  function submitData(data) {
    const image =
      typeof data.image[0] === 'string' ? data.image : data.image[0];

    if (isEditingSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset(), onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset(), onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(submitData, onError)}
      type={onCloseModal ? 'model' : 'regular'}
    >
      <FormInputRow label='Name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormInputRow>
      <FormInputRow
        label='Maximum capacity'
        error={errors?.maxCapacity?.message}
      >
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'The capacity should be least 1 ',
            },
          })}
        />
      </FormInputRow>

      <FormInputRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'The capacity should be least 1 ',
            },
          })}
        />
      </FormInputRow>

      <FormInputRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              getValues().regularPrice >= value ||
              'The discount should be less than regular price',
          })}
        />
      </FormInputRow>

      <FormInputRow
        label='Description for website'
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          disabled={isWorking}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormInputRow>

      <FormInputRow label='Cabin photo' error={errors?.description?.image}>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: isEditingSession ? false : 'This field is required',
          })}
        />
      </FormInputRow>

      <FormInputRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditingSession ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormInputRow>
    </Form>
  );
}

export default CreateCabinForm;
