import OptionallyDisplayed from './optionallyDisplayed';
import * as React from 'react';
import './inputField.css';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    errortext: string | undefined;
    addon?: string;
    label?: string;
}

class InputField extends React.Component<InputFieldProps> {
    private pristine: boolean = false;
    constructor(props: InputFieldProps) {
        super(props);
        this.shouldDisplayError = this.shouldDisplayError.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);
    }
    shouldDisplayError() {
        return this.pristine && !!this.props.errortext;
    }
    onFocusHandler() {
        this.pristine = true;
    }
    render() {
        let error = this.shouldDisplayError();
        return (
            <div className="row" >
                <div className="col-md-3 field-label-responsive">
                    <label htmlFor={this.props.id}>
                        {this.props.label}:
                    </label>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon">
                                <i className={'fa ' + this.props.addon}/>
                            </div>
                            <input
                                {...this.props}
                                type={this.props.type || 'text'}
                                className={'form-control ' + (error ? 'is-invalid' : '')}
                                onFocus={this.onFocusHandler}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <OptionallyDisplayed display={error}>
                        <div className={error ? 'text-danger' : ''} >
                            {this.props.errortext}
                        </div>
                    </OptionallyDisplayed>
                </div>
            </div>
        );
    }
}

export default InputField;