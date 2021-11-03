<template>
  <div>
    <!-- Footer Start -->
    <div class="flex-grow-1" />
    <section
      id="footer-wrap"
      class="footer_wrap"
    >
      <b-container>
        <b-row class="row">
          <b-col
            md="4"
            class="mb-4"
          >
            <div class=" o-hidden text-left">
              <div class="">
                <h4 class="card-title font-weight-bold">
                  Learn with me
                </h4>
                <p class="">
                  Είμαστε ένα site με σκοπό τη μάθηση. Έλα να μάθουμε μαζί!
                </p>
              </div>
            </div>
          </b-col>
          <!-- end of col -->
          <!-- <b-col
            md="4"
            class="mb-4"
          > -->
          <!-- <div class=" o-hidden text-left"> -->
          <!-- <div class=" ">
                <h4 class="card-title font-weight-bold">
                  Other Pages
                </h4>
                <div class=" mb-5 lead">
                  <ul class="list-inline">
                    <li class=" mb-3 ">
                      <a href="#">Marketing</a>
                    </li>
                    <li class=" mb-3 ">
                      <a href="#">Campaign</a>
                    </li>
                    <li class="mb-3">
                      <a href="#"> Digital Agency</a>
                    </li>
                  </ul>
                </div>
              </div> -->
          <!-- </div> -->
          <!-- </b-col> -->
          <!-- end of col -->
          <b-col
            md="4"
            class="mb-4 mb-lg-0 mb-md-0"
          >
            <div class=" o-hidden text-left">
              <div class="">
                <h4 class="card-title font-weight-bold">
                  Γιατί εμάς?
                </h4>
                <div class=" mb-5 lead">
                  <ul class="list-inline">
                    <li class=" mb-3 ">
                      <i class="eva eva-checkmark-outline mr-2 text-warning" />Μαθαίνω
                    </li>
                    <li class=" mb-3 ">
                      <i class="eva eva-checkmark-outline mr-2 text-warning" />Διασκεδάζω
                    </li>

                    <li class="mb-3">
                      <i
                        class="eva eva-checkmark-outline mr-2 text-warning"
                      />
                      Μπορώ να συναγωνιστώ συμμαθητές μου
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </b-col>
          <!-- end of col -->

          <b-col
            md="4"
            class="mb-lg-0 mb-md-0"
          >
            <div class=" o-hidden text-left">
              <div
                class=""
                style="height: 200px;"
              >
                <h4 class="card-title font-weight-bold">
                  Στοιχεία επικοινωνίας
                </h4>
                <div class="social-icons">
                  <a
                    href="https://www.instagram.com/learnwithme.eu/"
                    class="social-icon social-icon--instagram"
                  >
                    <i class="fa fa-instagram" />
                    <div class="tooltip">Follow us!</div>
                  </a>
                  <a
                    href=""
                    class="social-icon social-icon--facebook"
                  >
                    <i class="fa fa-facebook" />
                    <div class="tooltip">Like us!</div>
                  </a>
                </div>
              </div>
            </div>
          </b-col>
          <!-- end of col -->
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<style>
.social-icons{
    display: flex;
    position: relative;
    top: 38%;
}
.social-icon{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 80px;
    height: 80px;
    margin: 0 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    font-family: "Halvetica Neue",sans-serif,"Arial";
    font-size: 2.5rem;
    text-decoration: none;
    transition: all 0.15s ease;
    box-shadow: inset 1px 1px 2px #90a4ae,
                inset -1px -1px 2px white,
                5px 5px 10px #90a4ae,
                -5px -5px 10px white;
    border: 6px solid rgba(230,228,228);
}
/* Tooltips */
.tooltip {
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    padding: 0.8rem 1rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: bold;
    opacity: 0;
    pointer-events: none;
    text-transform: uppercase;
    transform: translate(-50%, -100%);
    transition: all 0.3s ease;
    z-index: 1;
  }
  .tooltip:after {
    display: block;
    position: absolute;
    bottom: 1px;
    left: 50%;
    width: 0;
    height: 0;
    content: "";
    border: solid;
    border-width: 10px 10px 0 10px;
    border-color: transparent;
    transform: translate(-50%, 100%);
  }

/* color */
.social-icon--instagram{
    background: #527fa6;
    color: white;
}
.social-icon--facebook{
    background: #3b5a9b;
    color: white;
}
/* Hover Effect*/
.social-icon:hover .tooltip {
    visibility: visible;
    opacity: 1;
    transform: translate(-50%, -150%);
}

.social-icon--facebook .tooltip{
    background: #3b5a9b;
    columns: currentColor;
}
.social-icon--facebook .tooltip::after{
    border-top-color: #3b5a9a;
}

.social-icon--instagram .tooltip{
    background: #527fa6;
    columns: currentColor;
}
.social-icon--instagram .tooltip:after{
    border-top-color: #527fa6;
}
</style>
