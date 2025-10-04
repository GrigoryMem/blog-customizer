import { Select } from 'src/ui/select';
import { Fragment } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { ChildrenRenderProps } from 'src/components/article-params-form/ArticleParamsForm';
import { Separator } from 'src/ui/separator';

export const setRenderElementsForm = ({
	key,
	title,
	options,
	selected,
	onChange,
}: ChildrenRenderProps): React.ReactNode => {
	if (key === 'fontSize' && title && selected) {
		return (
			<RadioGroup
				key={key}
				title={title}
				name={key}
				options={options}
				selected={selected}
				onChange={onChange}
			/>
		);
	}
	//  добавляем разделитель
	if (key === 'fontColor') {
		return (
			<Fragment key={key}>
				<Select
					options={options}
					title={title}
					selected={selected}
					onChange={onChange}
				/>
				<Separator />
			</Fragment>
		);
	}
	// рендер по умолчанию
	return (
		<Select
			key={key}
			options={options}
			title={title}
			selected={selected}
			onChange={onChange}
		/>
	);
};
