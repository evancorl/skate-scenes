import React from 'react';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

import EzInput from './EzInput';
import EzValidator from './EzValidator';

class EzForm extends React.Component {
  constructor(props) {
    super(props);

    this.validator = new EzValidator(this.props.schema);

    this.renderChildren = this.renderChildren.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      isValid: true,
      invalidKeys: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.asyncErrorMessage) {
      this.setState({
        isValid: false,
      });
    }
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => {
      const childType = child ? child.type : null;

      let newChild = child;

      if (child && _.contains(['input', 'textarea', EzInput], childType)) {
        const inputName = child.props.name;
        const errorMessage = this.validator.errorMessages[inputName] || null;

        newChild = childType === EzInput
          ? React.cloneElement(child, { errorMessage })
          : <EzInput errorMessage={errorMessage}>{child}</EzInput>;
      }

      return newChild;
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { beforeSubmit, onError, onSuccess } = this.props;

    const form = event.currentTarget;
    const inputs = this.collectInputs(form);

    if (beforeSubmit) beforeSubmit(inputs);

    const isFormValid = this.validateForm(inputs);

    if (!isFormValid && onError) {
      onError(inputs);
    } else if (isFormValid && onSuccess) {
      onSuccess(inputs);
    }

    return isFormValid;
  }

  collectInputs(form) {
    const formattedInputs = {};
    const inputs = $(form).find(':input:not(button)');
    const validator = this.validator;

    inputs.each(function () {
      if (validator.schema[this.name]) {
        const value = this.value === '' ? null : this.value;

        formattedInputs[this.name] = value;
      } else {
        console.warn('"' + this.name + '" is not a defined key in the schema.');
      }
    });

    return formattedInputs;
  }

  validateForm(inputs) {
    const isValid = this.validator.validateSchema(inputs);

    this.setState({
      isValid,
      invalidKeys: this.validator.invalidKeys,
    });

    return isValid;
  }

  render() {
    const {
      schema,
      className,
      beforeSubmit,
      onSuccess,
      onError,
      isSubmitting,
      asyncErrorMessage,
      ...other,
    } = this.props;

    const formClass = `ez-form ${className || ''}`;

    return (
      <form {...other} className={formClass} onSubmit={this.handleSubmit}>
        {this.renderChildren()}
      </form>
    );
  }
}

EzForm.propTypes = {
  schema: React.PropTypes.object.isRequired,
  beforeSubmit: React.PropTypes.func,
  onSuccess: React.PropTypes.func,
  onError: React.PropTypes.func,
  isSubmitting: React.PropTypes.bool,
  asyncErrorMessage: React.PropTypes.string,
};

EzInput.defaultProps = {
  isSubmitting: false,
  asyncErrorMessage: null,
};

export default EzForm;
