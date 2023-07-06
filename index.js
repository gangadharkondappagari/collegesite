function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    ul.style.display = "block";
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        console.log(filter);
        if(filter == ''){
            ul.style.display = "none";
        }
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
            //ul.style.display = "none";
        }
    }
}

ScrollReveal().reveal('.htmlclass',{ delay: 400 })
// card carousel

let header = document.getElementById('site-header-inner');

document.addEventListener('scroll', function() {
  
  // Get the scroll position
  let scrollPos = window.pageYOffset;
  
  if ( scrollPos > 100 ) {
    header.style.backgroundColor = "white";
  } else {
    header.style.backgroundColor = "blue";
  }
  
  
});


//contact

$(document).ready(function() {
    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            first_name: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please supply your first name'
                    }
                }
            },
             last_name: {
                validators: {
                     stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your last name'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your email address'
                    },
                    emailAddress: {
                        message: 'Please supply a valid email address'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your phone number'
                    },
                    phone: {
                        country: 'US',
                        message: 'Please supply a vaild phone number with area code'
                    }
                }
            },
            address: {
                validators: {
                     stringLength: {
                        min: 8,
                    },
                    notEmpty: {
                        message: 'Please supply your street address'
                    }
                }
            },
            city: {
                validators: {
                     stringLength: {
                        min: 4,
                    },
                    notEmpty: {
                        message: 'Please supply your city'
                    }
                }
            },
            state: {
                validators: {
                    notEmpty: {
                        message: 'Please select your state'
                    }
                }
            },
            zip: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your zip code'
                    },
                    zipCode: {
                        country: 'US',
                        message: 'Please supply a vaild zip code'
                    }
                }
            },
            comment: {
                validators: {
                      stringLength: {
                        min: 10,
                        max: 200,
                        message:'Please enter at least 10 characters and no more than 200'
                    },
                    notEmpty: {
                        message: 'Please supply a description of your project'
                    }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log(result);
            }, 'json');
        });
});

//contact

//slider

const { createApp, defineComponent, reactive } = Vue

// Supports max 5 steps, you can adjust it accordingly
const StepProgressBar = defineComponent({
  props: {
    steps: {
      type: Array,
      required: true,
      validator(arr) {
        return arr.length <= 5 && arr.every(obj => ['label'].every(key => key in obj))
      }
    },
    currentStep: {
      type: Number,
      default: 1
    },
    completedStep: {
      type: Number,
      default: 0
    },
    disableNavigation: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    isStepCurrent(index) {
      return index + 1 === this.currentStep
    },
    isStepCompleted(index) {
      return index + 1 !== this.currentStep && this.completedStep >= index + 1
    },
    isStepNavigable(index){
      return this.completedStep >= index
    }
  },
  template: `
    <ol class="stepProgressBar">
      <li
        v-for="(step, index) in steps"
        :key="index"
        class="stepProgressBar__step"
        :class="{
          'stepProgressBar__step--current': isStepCurrent(index),
          'stepProgressBar__step--completed': isStepCompleted(index),
          'stepProgressBar__step--navigable': isStepNavigable(index)
        }"
      >
        <div v-if="index > 0" class="stepProgressBar__step__line"></div>
        <button
          class="stepProgressBar__step__button"
          type="button"
          :disabled="disableNavigation && !isStepNavigable(index)"
          @click="$emit('step-clicked', index + 1)"
        >
          <span class="stepProgressBar__step__button__indicator">
            <svg
              v-if="isStepCompleted(index)"
              class="stepProgressBar__step__button__indicator__icon-completed"
              width="10"
              height="7"
              viewBox="0 0 12 9"
              fill="currentColor"
            >
              <path d="M1.05025 3.70714C1.44077 3.31661 2.07394 3.31661 2.46446 3.70714L5.29289 6.53556C5.68341 6.92609 5.68341 7.55925 5.29289 7.94978C4.90236 8.3403 4.2692 8.3403 3.87867 7.94978L1.05025 5.12135C0.659724 4.73083 0.659724 4.09766 1.05025 3.70714Z" />
              <path d="M10.9498 0.878709C11.3403 1.26923 11.3403 1.9024 10.9498 2.29292L5.29289 7.94978C4.90236 8.3403 4.2692 8.3403 3.87867 7.94978C3.48815 7.55925 3.48816 6.92609 3.87869 6.53556L9.53554 0.878709C9.92606 0.488184 10.5592 0.488184 10.9498 0.878709Z" />
            </svg>
          </span>
          <span class="stepProgressBar__step__button__label">
            {{ step.label }}
          </span>
        </button>
      </li>
    </ol>
  `
})


const app = createApp({
  components: { StepProgressBar },
  setup() {
    const state = reactive({
      currentStep: 1,
      completedStep: 0
    })
    const handleStepClicked = (value) => {
      state.currentStep = value
      if (value > state.completedStep) {
        state.completedStep = value - 1
      }
    }
    const steps = [
      { label: 'Step 1 👋 welcome' },
      { label: 'Step 2 👆 you are here' },
      { label: 'Step 3 💪 almost there' },
      { label: 'Step 4 🫶 one more' },
      { label: 'Step 5 👏 you made it' }
    ]
    return {
      state,
      handleStepClicked,
      steps
    }
  },
  template: `
    <div class="container">
      <StepProgressBar
        :steps="steps"
        :current-step="state.currentStep"
        :completed-step="state.completedStep"
        :disable-navigation="false"
        @step-clicked="handleStepClicked"
      />
    </div>
  `
})

app.mount('#app')


