import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useState } from 'react';
// мои наработки
// import {  Select } from 'src/ui/select';
import { SelectProps } from 'src/ui/select/Select';
import { RadioGroupProps } from 'src/ui/radio-group/RadioGroup';
// import { RadioGroup } from 'src/ui/radio-group';
import {
	FormElemsTitlesValues,
	FormState,
	FormKeys,
} from 'src/constants/formData';
import { OptionType } from 'src/constants/articleProps';
// import { StoryDecorator } from 'src/ui/story-decorator';
import { Text } from 'src/ui/text';
//  пропсы для ArticleParamsForm
// import { Separator } from 'src/ui/separator';
export type submitForm = FormState<OptionType>;
//  ограничиваем ключи полей формы нашими данными -для типизации заголовков полей формы
//  составляем кортеж для итерации по Object.entries - массив кортежей, по которым итерируемся
type PairData = [FormKeys, OptionType[]]; // кортеж типизации ключа заголовка + массив опций

type FormProps = {
	initState: FormState<OptionType>;
	dataFields: FormState<OptionType[]>;
	titlesFields: FormState<FormElemsTitlesValues>;
	children: (
		data:
			| (SelectProps & { key: FormKeys })
			| (RadioGroupProps & { key: FormKeys })
	) => React.ReactNode;
	onSubmit?: (data: FormState<OptionType>) => void;
	onReset?: () => void;
};

export const ArticleParamsForm = ({
	initState,
	dataFields,
	titlesFields,
	children,
	onSubmit,
	onReset,
}: FormProps) => {
	// открытие формы
	const [isOpen, setIsOpen] = useState(false);

	const [stateForm, setStateForm] = useState<FormState<OptionType>>(initState);
	// фнкция отправки формы
	function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
		// React.FormEvent - типизация событий формы submit
		// HTMLFormElement связнное с тегом form
		e.preventDefault();
		onSubmit?.(stateForm);
	}
	// функция сброса формы
	function handleResetForm() {
		// сброс состояния формы
		setStateForm(initState);
		//  сброс кастомизации страницы
		onReset?.();
	}

	function handleFormElemClick(option: OptionType, title: string) {
		setStateForm({
			...stateForm,
			[title]: option,
		});
	}

	useEffect(() => {
		console.log(stateForm);
	}, [stateForm]);

	function handelOpenFormClick() {
		setIsOpen(!isOpen);
	}
	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					handelOpenFormClick();
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: true })}>
				<form onSubmit={handleSubmitForm} className={styles.form}>
					{/* заголовок тоже можно пустить через пропс */}
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					{/* моя правка */}
					<div className={styles.selectGroup}>
						{(Object.entries(dataFields) as PairData[]).map(
							// кортеж PairData  а если такой ключ title напр  ?? в объекте Object.entries(articlesData)

							([keyTitle, options]) => {
								// if (title === 'fontSize') {
								// 	return (
								// 		<RadioGroup
								// 			key={title}
								// 			title={titlesFields[title]}
								// 			name={title}
								// 			options={options}
								// 			selected={stateForm.fontSize}
								// 			onChange={(option) => {
								// 				handleFormElemClick(option, title);
								// 			}}
								// 		/>
								// 	);
								// }
								// if (title === 'fontColor') {
								// 	return (
								// 		<React.Fragment key={title}>
								// 			<Select
								// 				options={options}
								// 				title={titlesFields[title]}
								// 				selected={stateForm[title]}
								// 				onChange={(option) => {
								// 					handleFormElemClick(option, title);
								// 				}}
								// 			/>
								// 			<Separator />
								// 		</React.Fragment>
								// 	);
								// }
								return (
									// <Select
									// 	key={title}
									// 	options={options}
									// 	title={titlesFields[title]}
									// 	selected={stateForm[title]}
									// 	onChange={(option) => {
									// 		handleFormElemClick(option, title);
									// 	}}
									// />
									children({
										key: keyTitle,
										options,
										title: titlesFields[keyTitle],
										selected: stateForm[keyTitle],
										onChange: (option) => {
											handleFormElemClick(option, keyTitle);
										},
									})
								);
							}
						)}
						{/* {(Object.entries(dataFields) as PairData[]).map(
							// кортеж PairData  а если такой ключ title ?? в объекте Object.entries(articlesData)

							([title, options]) => {
								if (title === 'fontSize') {
									return (
										<RadioGroup
											key={title}
											title={titlesFields[title]}
											name={title}
											options={options}
											selected={stateForm.fontSize}
											onChange={(option) => {
												handleFormElemClick(option, title);
											}}
										/>
									);
								}
								if (title === 'fontColor') {
									return (
										<React.Fragment key={title}>
											<Select
												options={options}
												title={titlesFields[title]}
												selected={stateForm[title]}
												onChange={(option) => {
													handleFormElemClick(option, title);
												}}
											/>
											<Separator />
										</React.Fragment>
									);
								}
								return (
									<Select
										key={title}
										options={options}
										title={titlesFields[title]}
										selected={stateForm[title]}
										onChange={(option) => {
											handleFormElemClick(option, title);
										}}
									/>
								);
							}
						)} */}
					</div>
					<div className={styles.bottomContainer}>
						<Button
							onClick={handleResetForm}
							title='Сбросить'
							htmlType='reset'
							type='clear'
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
